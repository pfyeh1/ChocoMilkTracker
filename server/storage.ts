import { type Drink, type InsertDrink } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getDrinks(): Promise<Drink[]>;
  getDrink(id: string): Promise<Drink | undefined>;
  createDrink(drink: InsertDrink): Promise<Drink>;
  deleteDrink(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private drinks: Map<string, Drink>;

  constructor() {
    this.drinks = new Map();
  }

  async getDrinks(): Promise<Drink[]> {
    return Array.from(this.drinks.values()).sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  async getDrink(id: string): Promise<Drink | undefined> {
    return this.drinks.get(id);
  }

  async createDrink(insertDrink: InsertDrink): Promise<Drink> {
    const id = randomUUID();
    const drink: Drink = { 
      id,
      sizeOz: insertDrink.sizeOz,
      timestamp: insertDrink.timestamp || new Date(),
      note: insertDrink.note ?? null
    };
    this.drinks.set(id, drink);
    return drink;
  }

  async deleteDrink(id: string): Promise<boolean> {
    return this.drinks.delete(id);
  }
}

export const storage = new MemStorage();
