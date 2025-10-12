// ===============================
// PROJECTS INTERFACE
// ===============================
export interface Project {
  id: string;
  name: string;
  county: string;
  description: string;
  trees_target: number; // ✅ matches DB column name
  trees_planted: number;
  co2_offset: number;
  status: 'Available' | 'In Progress' | 'Funded';
  image_url?: string; // 🔄 renamed to snake_case to match Supabase column naming
  created_at?: string; // 🕒 optional, for sorting or display
}


// ===============================
// EVENTS INTERFACE
// ===============================
export interface Event {
  id: string;
  name: string;
  date: string; // ✅ stores ISO date strings from Supabase
  location: string;
  county: string;
  trees_target: number; // 🔄 same snake_case convention
  project_id: string;
  project_name: string;
  participants_count: number;
  description: string;
}


// ===============================
// USER IMPACT INTERFACE
// ===============================
export interface UserImpact {
  treesPlanted: number;
  co2Offset: number;
  eventsParticipated: number;
  badges?: string[]; // 🏅 added for your badge section in Impact.tsx
  eventHistory: {
    eventId: string;
    eventName: string;
    date: string;
    treesPlanted: number;
  }[];
}
