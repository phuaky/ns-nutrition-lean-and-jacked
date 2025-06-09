import { users, userProfiles, dailyIntake, type User, type InsertUser, type UserProfile, type InsertUserProfile, type DailyIntake, type InsertDailyIntake } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUserProfile(userId: number): Promise<UserProfile | undefined>;
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  updateUserProfile(userId: number, profile: Partial<InsertUserProfile>): Promise<UserProfile | undefined>;
  getDailyIntake(userId: number, date: string): Promise<DailyIntake[]>;
  createDailyIntake(intake: InsertDailyIntake): Promise<DailyIntake>;
  deleteDailyIntake(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private userProfiles: Map<number, UserProfile>;
  private dailyIntakes: Map<number, DailyIntake>;
  private currentUserId: number;
  private currentProfileId: number;
  private currentIntakeId: number;

  constructor() {
    this.users = new Map();
    this.userProfiles = new Map();
    this.dailyIntakes = new Map();
    this.currentUserId = 1;
    this.currentProfileId = 1;
    this.currentIntakeId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getUserProfile(userId: number): Promise<UserProfile | undefined> {
    return Array.from(this.userProfiles.values()).find(
      (profile) => profile.userId === userId,
    );
  }

  async createUserProfile(insertProfile: InsertUserProfile): Promise<UserProfile> {
    const id = this.currentProfileId++;
    const profile: UserProfile = { 
      userId: insertProfile.userId,
      weight: insertProfile.weight,
      bodyFat: insertProfile.bodyFat,
      targetWeight: insertProfile.targetWeight,
      inbodyScore: insertProfile.inbodyScore,
      bmr: insertProfile.bmr,
      activityLevel: insertProfile.activityLevel ?? 1.375,
      timeline: insertProfile.timeline ?? 90,
      id, 
      createdAt: new Date().toISOString() 
    };
    this.userProfiles.set(id, profile);
    return profile;
  }

  async updateUserProfile(userId: number, updateData: Partial<InsertUserProfile>): Promise<UserProfile | undefined> {
    const existingProfile = Array.from(this.userProfiles.values()).find(
      (profile) => profile.userId === userId,
    );
    
    if (!existingProfile) return undefined;

    const updatedProfile: UserProfile = { ...existingProfile, ...updateData };
    this.userProfiles.set(existingProfile.id, updatedProfile);
    return updatedProfile;
  }

  async getDailyIntake(userId: number, date: string): Promise<DailyIntake[]> {
    return Array.from(this.dailyIntakes.values()).filter(
      (intake) => intake.userId === userId && intake.date === date,
    );
  }

  async createDailyIntake(insertIntake: InsertDailyIntake): Promise<DailyIntake> {
    const id = this.currentIntakeId++;
    const intake: DailyIntake = { ...insertIntake, id };
    this.dailyIntakes.set(id, intake);
    return intake;
  }

  async deleteDailyIntake(id: number): Promise<boolean> {
    return this.dailyIntakes.delete(id);
  }
}

export const storage = new MemStorage();
