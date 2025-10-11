export interface Project {
  id: string;
  name: string;
  county: string;
  description: string;
  treesTarget: number;
  treesPlanted: number;
  co2Offset: number;
  status: 'Available' | 'In Progress' | 'Funded';
  imageUrl?: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  county: string;
  treesTarget: number;
  projectId: string;
  projectName: string;
  participantsCount: number;
  description: string;
}

export interface UserImpact {
  treesPlanted: number;
  co2Offset: number;
  eventsParticipated: number;
  eventHistory: {
    eventId: string;
    eventName: string;
    date: string;
    treesPlanted: number;
  }[];
}
