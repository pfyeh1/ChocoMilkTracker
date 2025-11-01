import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDrinkSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all drinks
  app.get("/api/drinks", async (_req, res) => {
    try {
      const drinks = await storage.getDrinks();
      res.json(drinks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch drinks" });
    }
  });

  // Get a single drink
  app.get("/api/drinks/:id", async (req, res) => {
    try {
      const drink = await storage.getDrink(req.params.id);
      if (!drink) {
        return res.status(404).json({ error: "Drink not found" });
      }
      res.json(drink);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch drink" });
    }
  });

  // Create a new drink
  app.post("/api/drinks", async (req, res) => {
    try {
      const validatedData = insertDrinkSchema.parse(req.body);
      const drink = await storage.createDrink(validatedData);
      res.status(201).json(drink);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        res.status(400).json({ error: "Invalid drink data", details: error.message });
      } else {
        res.status(500).json({ error: "Failed to create drink" });
      }
    }
  });

  // Delete a drink
  app.delete("/api/drinks/:id", async (req, res) => {
    try {
      const success = await storage.deleteDrink(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Drink not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete drink" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
