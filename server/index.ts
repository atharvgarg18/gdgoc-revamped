import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { requireAuth } from "./middleware/auth";
import {
  adminLogin,
  adminLogout,
  getEventsAdmin,
  createEvent,
  updateEventAdmin,
  deleteEventAdmin,
  getTeamAdmin,
  createTeamMember,
  updateTeamMemberAdmin,
  deleteTeamMemberAdmin,
  getGalleryAdmin,
  createGalleryItem,
  updateGalleryItemAdmin,
  deleteGalleryItemAdmin,
} from "./routes/admin";
import { getEvents, getTeamMembers, getGalleryItems } from "./utils/data-store";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Public API routes (for frontend to fetch data)
  app.get("/api/events", async (_req, res) => {
    try {
      const events = await getEvents();
      res.json({ success: true, data: events });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error fetching events" });
    }
  });

  app.get("/api/team", async (_req, res) => {
    try {
      const team = await getTeamMembers();
      res.json({ success: true, data: team });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching team" });
    }
  });

  app.get("/api/gallery", async (_req, res) => {
    try {
      const gallery = await getGalleryItems();
      res.json({ success: true, data: gallery });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error fetching gallery" });
    }
  });

  // Admin authentication
  app.post("/api/admin/login", adminLogin);
  app.post("/api/admin/logout", requireAuth, adminLogout);

  // Admin events routes
  app.get("/api/admin/events", requireAuth, getEventsAdmin);
  app.post("/api/admin/events", requireAuth, createEvent);
  app.put("/api/admin/events/:id", requireAuth, updateEventAdmin);
  app.delete("/api/admin/events/:id", requireAuth, deleteEventAdmin);

  // Admin team routes
  app.get("/api/admin/team", requireAuth, getTeamAdmin);
  app.post("/api/admin/team", requireAuth, createTeamMember);
  app.put("/api/admin/team/:id", requireAuth, updateTeamMemberAdmin);
  app.delete("/api/admin/team/:id", requireAuth, deleteTeamMemberAdmin);

  // Admin gallery routes
  app.get("/api/admin/gallery", requireAuth, getGalleryAdmin);
  app.post("/api/admin/gallery", requireAuth, createGalleryItem);
  app.put("/api/admin/gallery/:id", requireAuth, updateGalleryItemAdmin);
  app.delete("/api/admin/gallery/:id", requireAuth, deleteGalleryItemAdmin);

  return app;
}
