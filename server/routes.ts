import type { Express } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import MemoryStore from "memorystore";
import { storage } from "./storage";
import { insertUserProfileSchema, insertDailyIntakeSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Session configuration
  const MemoryStoreSession = MemoryStore(session);
  app.use(session({
    secret: process.env.SESSION_SECRET || 'nutrition-tracker-secret-key',
    resave: false,
    saveUninitialized: false,
    store: new MemoryStoreSession({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    cookie: {
      secure: false, // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));

  // Passport configuration
  app.use(passport.initialize());
  app.use(passport.session());

  // Discord OAuth strategy
  if (process.env.DISCORD_CLIENT_ID && process.env.DISCORD_CLIENT_SECRET) {
    passport.use(new DiscordStrategy({
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_CALLBACK_URL || "/auth/discord/callback",
      scope: ['identify']
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await storage.getUserByDiscordId(profile.id);
        
        if (!user) {
          user = await storage.createDiscordUser({
            discordId: profile.id,
            discordUsername: profile.username,
            avatar: profile.avatar ? profile.avatar : undefined
          });
        }
        
        return done(null, user);
      } catch (error) {
        return done(error, undefined);
      }
    }));
  }

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Authentication routes
  app.get("/auth/discord", passport.authenticate("discord"));
  app.get("/auth/discord/callback", 
    passport.authenticate("discord", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.post("/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/auth/user", (req, res) => {
    if (req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.status(401).json({ message: "Not authenticated" });
    }
  });

  // Get current user's profile
  app.get("/api/profile", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const user = req.user as any;
      const profile = await storage.getUserProfile(user.id);
      
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Failed to get profile" });
    }
  });

  // Get user profile by ID (for backward compatibility)
  app.get("/api/profile/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const profile = await storage.getUserProfile(userId);
      
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Failed to get profile" });
    }
  });

  // Create or update user profile
  app.post("/api/profile", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const user = req.user as any;
      const profileData = { ...req.body, userId: user.id };
      const validatedData = insertUserProfileSchema.parse(profileData);
      
      // Check if profile exists
      const existingProfile = await storage.getUserProfile(user.id);
      
      let profile;
      if (existingProfile) {
        profile = await storage.updateUserProfile(user.id, validatedData);
      } else {
        profile = await storage.createUserProfile(validatedData);
      }
      
      res.json(profile);
    } catch (error) {
      res.status(400).json({ message: "Invalid profile data" });
    }
  });

  // Get current user's daily intake for a specific date
  app.get("/api/intake/:date", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const user = req.user as any;
      const date = req.params.date;
      
      const intake = await storage.getDailyIntake(user.id, date);
      res.json(intake);
    } catch (error) {
      res.status(500).json({ message: "Failed to get daily intake" });
    }
  });

  // Get daily intake for a specific user and date (backward compatibility)
  app.get("/api/intake/:userId/:date", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const date = req.params.date;
      
      const intake = await storage.getDailyIntake(userId, date);
      res.json(intake);
    } catch (error) {
      res.status(500).json({ message: "Failed to get daily intake" });
    }
  });

  // Add meal to daily intake
  app.post("/api/intake", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const user = req.user as any;
      const intakeData = { ...req.body, userId: user.id };
      const validatedData = insertDailyIntakeSchema.parse(intakeData);
      const intake = await storage.createDailyIntake(validatedData);
      res.json(intake);
    } catch (error) {
      res.status(400).json({ message: "Invalid intake data" });
    }
  });

  // Delete meal from daily intake
  app.delete("/api/intake/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteDailyIntake(id);
      
      if (!success) {
        return res.status(404).json({ message: "Intake record not found" });
      }
      
      res.json({ message: "Intake record deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete intake record" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
