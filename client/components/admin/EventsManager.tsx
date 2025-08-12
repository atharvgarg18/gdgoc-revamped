import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  Event,
} from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Edit, Trash2, Calendar, Clock, Users, MapPin, Link2, Eye, Star } from "lucide-react";
import { toast } from "sonner";

interface EventFormData {
  title: string;
  date: string;
  time: string;
  type: string;
  description: string;
  color: "gdsc-blue" | "gdsc-red" | "gdsc-yellow" | "gdsc-green";
  attendees: number;
  max_attendees?: number;
  image?: string;
  registration_link?: string;
  location?: string;
  status: "draft" | "published" | "archived";
  featured: boolean;
}

const initialFormData: EventFormData = {
  title: "",
  date: "",
  time: "",
  type: "",
  description: "",
  color: "gdsc-blue",
  attendees: 0,
  max_attendees: 100,
  image: "",
  registration_link: "",
  location: "",
  status: "published",
  featured: false,
};

export default function EventsManager() {
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<EventFormData>(initialFormData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "draft" | "published" | "archived">("all");
  const [filterColor, setFilterColor] = useState<"all" | "gdsc-blue" | "gdsc-red" | "gdsc-yellow" | "gdsc-green">("all");
  
  const queryClient = useQueryClient();

  // Fetch events with React Query
  const { data: events = [], isLoading, error } = useQuery({
    queryKey: ['admin-events'],
    queryFn: async (): Promise<Event[]> => {
      const result = await getEvents();
      if (!result.success) {
        throw new Error(result.error || "Failed to fetch events");
      }
      return result.data;
    },
    refetchInterval: 30000,
  });

  // Create event mutation
  const createEventMutation = useMutation({
    mutationFn: async (eventData: EventFormData): Promise<Event> => {
      const result = await createEvent(eventData);
      if (!result.success) {
        throw new Error(result.error || "Failed to create event");
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      queryClient.invalidateQueries({ queryKey: ['public-events'] });
      toast.success("🎉 Event created successfully!");
      resetForm();
    },
    onError: (error: Error) => {
      toast.error(`❌ Failed to create event: ${error.message}`);
    },
  });

  // Update event mutation
  const updateEventMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: EventFormData }): Promise<Event> => {
      const result = await updateEvent(id, updates);
      if (!result.success) {
        throw new Error(result.error || "Failed to update event");
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      queryClient.invalidateQueries({ queryKey: ['public-events'] });
      toast.success("✅ Event updated successfully!");
      resetForm();
    },
    onError: (error: Error) => {
      toast.error(`❌ Failed to update event: ${error.message}`);
    },
  });

  // Delete event mutation
  const deleteEventMutation = useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const result = await deleteEvent(id);
      if (!result.success) {
        throw new Error(result.error || "Failed to delete event");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      queryClient.invalidateQueries({ queryKey: ['public-events'] });
      toast.success("🗑️ Event deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(`❌ Failed to delete event: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingEvent) {
      updateEventMutation.mutate({ id: editingEvent.id, updates: formData });
    } else {
      createEventMutation.mutate(formData);
    }
  };

  const handleDelete = (event: Event) => {
    if (window.confirm(`Are you sure you want to delete "${event.title}"? This action cannot be undone.`)) {
      deleteEventMutation.mutate(event.id);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      type: event.type,
      description: event.description,
      color: event.color,
      attendees: event.attendees,
      max_attendees: event.max_attendees || 100,
      image: event.image || "",
      registration_link: event.registration_link || "",
      location: event.location || "",
      status: event.status || "published",
      featured: event.featured || false,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingEvent(null);
    setFormData(initialFormData);
  };

  const getColorVariant = (color: string) => {
    switch (color) {
      case "gdsc-blue": return "default";
      case "gdsc-red": return "destructive";
      case "gdsc-yellow": return "secondary";
      case "gdsc-green": return "outline";
      default: return "default";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      case "archived": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Filter events based on search and filters
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || event.status === filterStatus;
    const matchesColor = filterColor === "all" || event.color === filterColor;
    return matchesSearch && matchesStatus && matchesColor;
  });

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-2">❌ Error loading events</div>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with glassmorphism effect */}
      <div className="relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-4 left-4 w-16 h-16 bg-gdsc-blue/10 rounded-full animate-float"></div>
          <div className="absolute top-8 right-8 w-12 h-12 bg-gdsc-red/10 rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
          <div className="absolute bottom-4 left-1/4 w-20 h-20 bg-gdsc-yellow/10 rounded-full animate-float" style={{ animationDelay: "2s" }}></div>
          <div className="absolute bottom-8 right-1/3 w-14 h-14 bg-gdsc-green/10 rounded-full animate-float" style={{ animationDelay: "0.5s" }}></div>
        </div>

        <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                {/* GDSC Logo Pattern */}
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-gdsc-blue"></div>
                  <div className="w-3 h-3 rounded-full bg-gdsc-red"></div>
                  <div className="w-3 h-3 rounded-full bg-gdsc-yellow"></div>
                  <div className="w-3 h-3 rounded-full bg-gdsc-green"></div>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gdsc-blue to-gdsc-green bg-clip-text text-transparent">
                  Events Management
                </h2>
              </div>
              <p className="text-gray-600">Manage community events and workshops</p>
            </div>
            
            <Dialog open={showForm} onOpenChange={setShowForm}>
              <DialogTrigger asChild>
                <Button 
                  onClick={() => setShowForm(true)}
                  className="btn-animate bg-gradient-to-r from-gdsc-blue to-blue-600 hover:from-blue-600 hover:to-gdsc-blue shadow-lg hover:shadow-xl"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gdsc-blue"></div>
                      <div className="w-2 h-2 rounded-full bg-gdsc-red"></div>
                      <div className="w-2 h-2 rounded-full bg-gdsc-yellow"></div>
                      <div className="w-2 h-2 rounded-full bg-gdsc-green"></div>
                    </div>
                    <span>{editingEvent ? "Edit Event" : "Create New Event"}</span>
                  </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-gdsc-blue" />
                      Basic Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="title">Event Title *</Label>
                        <Input
                          id="title"
                          required
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="Introduction to Machine Learning"
                          className="focus:ring-gdsc-blue focus:border-gdsc-blue"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="date">Date *</Label>
                        <Input
                          id="date"
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          placeholder="Dec 15, 2024"
                          className="focus:ring-gdsc-blue focus:border-gdsc-blue"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="time">Time *</Label>
                        <Input
                          id="time"
                          required
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          placeholder="2:00 PM - 5:00 PM"
                          className="focus:ring-gdsc-blue focus:border-gdsc-blue"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="type">Event Type *</Label>
                        <Input
                          id="type"
                          required
                          value={formData.type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          placeholder="Workshop, Seminar, Bootcamp"
                          className="focus:ring-gdsc-blue focus:border-gdsc-blue"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="color">Color Theme</Label>
                        <Select value={formData.color} onValueChange={(value: any) => setFormData({ ...formData, color: value })}>
                          <SelectTrigger className="focus:ring-gdsc-blue focus:border-gdsc-blue">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gdsc-blue">🔵 Blue</SelectItem>
                            <SelectItem value="gdsc-red">🔴 Red</SelectItem>
                            <SelectItem value="gdsc-yellow">🟡 Yellow</SelectItem>
                            <SelectItem value="gdsc-green">🟢 Green</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        required
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Learn the fundamentals of ML with hands-on exercises"
                        className="focus:ring-gdsc-blue focus:border-gdsc-blue"
                      />
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 rounded-xl p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-gdsc-blue" />
                      Event Details
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="attendees">Current Attendees</Label>
                        <Input
                          id="attendees"
                          type="number"
                          min="0"
                          value={formData.attendees}
                          onChange={(e) => setFormData({ ...formData, attendees: parseInt(e.target.value) || 0 })}
                          className="focus:ring-gdsc-blue focus:border-gdsc-blue"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="max_attendees">Max Attendees</Label>
                        <Input
                          id="max_attendees"
                          type="number"
                          min="1"
                          value={formData.max_attendees}
                          onChange={(e) => setFormData({ ...formData, max_attendees: parseInt(e.target.value) || 100 })}
                          className="focus:ring-gdsc-blue focus:border-gdsc-blue"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="Computer Lab, IET DAVV"
                          className="focus:ring-gdsc-blue focus:border-gdsc-blue"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                          <SelectTrigger className="focus:ring-gdsc-blue focus:border-gdsc-blue">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">📝 Draft</SelectItem>
                            <SelectItem value="published">✅ Published</SelectItem>
                            <SelectItem value="archived">📁 Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="rounded border-gray-300 text-gdsc-blue focus:ring-gdsc-blue"
                      />
                      <Label htmlFor="featured" className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        Featured Event
                      </Label>
                    </div>
                  </div>

                  {/* Media & Links */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50/50 rounded-xl p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Link2 className="w-5 h-5 mr-2 text-gdsc-green" />
                      Media & Links
                    </h3>
                    
                    <div>
                      <Label htmlFor="image">Image URL</Label>
                      <Input
                        id="image"
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                        className="focus:ring-gdsc-blue focus:border-gdsc-blue"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="registration_link">Registration Link</Label>
                      <Input
                        id="registration_link"
                        type="url"
                        value={formData.registration_link}
                        onChange={(e) => setFormData({ ...formData, registration_link: e.target.value })}
                        placeholder="https://forms.gle/example"
                        className="focus:ring-gdsc-blue focus:border-gdsc-blue"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={createEventMutation.isPending || updateEventMutation.isPending}
                      className="bg-gradient-to-r from-gdsc-blue to-blue-600 hover:from-blue-600 hover:to-gdsc-blue"
                    >
                      {(createEventMutation.isPending || updateEventMutation.isPending) && (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      )}
                      {editingEvent ? "Update Event" : "Create Event"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="border-gray-200/50 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search events by title, description, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="focus:ring-gdsc-blue focus:border-gdsc-blue"
              />
            </div>
            <div className="flex gap-3">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterColor} onValueChange={setFilterColor}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Colors</SelectItem>
                  <SelectItem value="gdsc-blue">🔵 Blue</SelectItem>
                  <SelectItem value="gdsc-red">🔴 Red</SelectItem>
                  <SelectItem value="gdsc-yellow">🟡 Yellow</SelectItem>
                  <SelectItem value="gdsc-green">🟢 Green</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-gdsc-blue mx-auto mb-4" />
            <p className="text-gray-600">Loading events...</p>
          </div>
        </div>
      ) : filteredEvents.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="flex space-x-1 mb-4">
              <div className="w-4 h-4 rounded-full bg-gdsc-blue/20"></div>
              <div className="w-4 h-4 rounded-full bg-gdsc-red/20"></div>
              <div className="w-4 h-4 rounded-full bg-gdsc-yellow/20"></div>
              <div className="w-4 h-4 rounded-full bg-gdsc-green/20"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500 text-center max-w-md">
              {searchTerm || filterStatus !== "all" || filterColor !== "all" 
                ? "Try adjusting your search or filters to find events."
                : "Create your first event to get started!"
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <Card 
              key={event.id} 
              className={`group hover:shadow-xl transition-all duration-300 card-hover border-gray-200/50 overflow-hidden ${
                event.featured ? 'ring-2 ring-yellow-200 ring-opacity-50' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`h-2 ${
                event.color === "gdsc-blue" ? "bg-gdsc-blue" :
                event.color === "gdsc-red" ? "bg-gdsc-red" :
                event.color === "gdsc-yellow" ? "bg-gdsc-yellow" : "bg-gdsc-green"
              } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <Badge variant={getColorVariant(event.color)}>
                      {event.type}
                    </Badge>
                    {event.featured && (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Badge className={getStatusColor(event.status || "published")}>
                      {event.status || "published"}
                    </Badge>
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(event)}
                        className="h-8 w-8 p-0 hover:bg-blue-50"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(event)}
                        disabled={deleteEventMutation.isPending}
                        className="h-8 w-8 p-0 hover:bg-red-50"
                      >
                        {deleteEventMutation.isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4 text-red-600" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-gdsc-blue transition-colors">
                  {event.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {event.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gdsc-blue" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gdsc-green" />
                    <span>{event.time}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gdsc-red" />
                      <span>{event.location}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-gdsc-yellow" />
                      <span>{event.attendees}{event.max_attendees ? `/${event.max_attendees}` : ''} attendees</span>
                    </div>
                    {event.registration_link && (
                      <Button variant="ghost" size="sm" asChild className="h-6 px-2">
                        <a href={event.registration_link} target="_blank" rel="noopener noreferrer">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
