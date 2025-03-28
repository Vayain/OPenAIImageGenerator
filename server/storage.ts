import { 
  users, 
  imageGenerations, 
  type User, 
  type InsertUser,
  type ImageGeneration,
  type InsertImageGeneration
} from "@shared/schema";
import { eq } from 'drizzle-orm';
import { db } from './db';

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Image generation operations
  createImageGeneration(generation: InsertImageGeneration & { imageUrl: string }): Promise<ImageGeneration>;
  getAllImageGenerations(): Promise<ImageGeneration[]>;
  getRecentImageGenerations(limit: number): Promise<ImageGeneration[]>;
  getImageGeneration(id: number): Promise<ImageGeneration | undefined>;
}

export class PostgresStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Image generation methods
  async createImageGeneration(generation: InsertImageGeneration & { imageUrl: string }): Promise<ImageGeneration> {
    const result = await db.insert(imageGenerations).values(generation).returning();
    return result[0];
  }

  async getAllImageGenerations(): Promise<ImageGeneration[]> {
    return await db.select().from(imageGenerations).orderBy(imageGenerations.createdAt);
  }

  async getRecentImageGenerations(limit: number): Promise<ImageGeneration[]> {
    return await db.select().from(imageGenerations).orderBy(imageGenerations.createdAt).limit(limit);
  }

  async getImageGeneration(id: number): Promise<ImageGeneration | undefined> {
    const result = await db.select().from(imageGenerations).where(eq(imageGenerations.id, id)).limit(1);
    return result[0];
  }
}

export const storage = new PostgresStorage();
