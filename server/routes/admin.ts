import { RequestHandler } from "express";
import {
  AdminLoginRequest,
  AdminLoginResponse,
  AdminDataResponse,
  AdminCreateResponse,
  AdminUpdateResponse,
  AdminDeleteResponse,
  Event,
  TeamMember,
  GalleryItem,
} from "@shared/admin-types";
import {
  verifyPassword,
  createSession,
  validateSession,
  destroySession,
} from "../middleware/auth";
import {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  getTeamMembers,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
  getGalleryItems,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "../utils/data-store";

// Admin Login
export const adminLogin: RequestHandler = (req, res) => {
  try {
    const { password }: AdminLoginRequest = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      } as AdminLoginResponse);
    }

    if (!verifyPassword(password)) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      } as AdminLoginResponse);
    }

    const token = createSession();
    res.json({
      success: true,
      token,
      message: "Login successful",
    } as AdminLoginResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    } as AdminLoginResponse);
  }
};

// Admin Logout
export const adminLogout: RequestHandler = (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (token) {
      destroySession(token);
    }

    res.json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Events API
export const getEventsAdmin: RequestHandler = async (req, res) => {
  try {
    const events = await getEvents();
    res.json({
      success: true,
      data: events,
      message: "Events retrieved successfully",
    } as AdminDataResponse<Event>);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving events",
    } as AdminDataResponse<Event>);
  }
};

export const createEvent: RequestHandler = async (req, res) => {
  try {
    const eventData = req.body;
    const newEvent = await addEvent(eventData);

    res.status(201).json({
      success: true,
      id: newEvent.id,
      message: "Event created successfully",
    } as AdminCreateResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating event",
    } as AdminCreateResponse);
  }
};

export const updateEventAdmin: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const success = await updateEvent(id, updates);
    if (!success) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      } as AdminUpdateResponse);
    }

    res.json({
      success: true,
      message: "Event updated successfully",
    } as AdminUpdateResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating event",
    } as AdminUpdateResponse);
  }
};

export const deleteEventAdmin: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const success = await deleteEvent(id);
    if (!success) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      } as AdminDeleteResponse);
    }

    res.json({
      success: true,
      message: "Event deleted successfully",
    } as AdminDeleteResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting event",
    } as AdminDeleteResponse);
  }
};

// Team API
export const getTeamAdmin: RequestHandler = async (req, res) => {
  try {
    const team = await getTeamMembers();
    res.json({
      success: true,
      data: team,
      message: "Team members retrieved successfully",
    } as AdminDataResponse<TeamMember>);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving team members",
    } as AdminDataResponse<TeamMember>);
  }
};

export const createTeamMember: RequestHandler = (req, res) => {
  try {
    const memberData = req.body;
    const newMember = addTeamMember(memberData);

    res.status(201).json({
      success: true,
      id: newMember.id,
      message: "Team member created successfully",
    } as AdminCreateResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating team member",
    } as AdminCreateResponse);
  }
};

export const updateTeamMemberAdmin: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const success = updateTeamMember(id, updates);
    if (!success) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      } as AdminUpdateResponse);
    }

    res.json({
      success: true,
      message: "Team member updated successfully",
    } as AdminUpdateResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating team member",
    } as AdminUpdateResponse);
  }
};

export const deleteTeamMemberAdmin: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;

    const success = deleteTeamMember(id);
    if (!success) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      } as AdminDeleteResponse);
    }

    res.json({
      success: true,
      message: "Team member deleted successfully",
    } as AdminDeleteResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting team member",
    } as AdminDeleteResponse);
  }
};

// Gallery API
export const getGalleryAdmin: RequestHandler = async (req, res) => {
  try {
    const gallery = await getGalleryItems();
    res.json({
      success: true,
      data: gallery,
      message: "Gallery items retrieved successfully",
    } as AdminDataResponse<GalleryItem>);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving gallery items",
    } as AdminDataResponse<GalleryItem>);
  }
};

export const createGalleryItem: RequestHandler = (req, res) => {
  try {
    const itemData = req.body;
    const newItem = addGalleryItem(itemData);

    res.status(201).json({
      success: true,
      id: newItem.id,
      message: "Gallery item created successfully",
    } as AdminCreateResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating gallery item",
    } as AdminCreateResponse);
  }
};

export const updateGalleryItemAdmin: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const success = updateGalleryItem(id, updates);
    if (!success) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      } as AdminUpdateResponse);
    }

    res.json({
      success: true,
      message: "Gallery item updated successfully",
    } as AdminUpdateResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating gallery item",
    } as AdminUpdateResponse);
  }
};

export const deleteGalleryItemAdmin: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;

    const success = deleteGalleryItem(id);
    if (!success) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      } as AdminDeleteResponse);
    }

    res.json({
      success: true,
      message: "Gallery item deleted successfully",
    } as AdminDeleteResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting gallery item",
    } as AdminDeleteResponse);
  }
};
