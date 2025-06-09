import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserProfileSchema, insertDailyIntakeSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get user profile
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
    try {
      const profileData = insertUserProfileSchema.parse(req.body);
      
      // Check if profile exists
      const existingProfile = await storage.getUserProfile(profileData.userId);
      
      let profile;
      if (existingProfile) {
        profile = await storage.updateUserProfile(profileData.userId, profileData);
      } else {
        profile = await storage.createUserProfile(profileData);
      }
      
      res.json(profile);
    } catch (error) {
      res.status(400).json({ message: "Invalid profile data" });
    }
  });

  // Get daily intake for a specific date
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
    try {
      const intakeData = insertDailyIntakeSchema.parse(req.body);
      const intake = await storage.createDailyIntake(intakeData);
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
