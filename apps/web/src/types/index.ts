// Core domain types for CareerOS frontend

export type FactSource = 'USER_ENTERED' | 'USER_CONFIRMED' | 'CV_IMPORTED' | 'DOCUMENT_IMPORTED' | 'CONNECTED_PROFILE' | 'SYSTEM_DERIVED';
export type CVStatus = 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
export type CVLanguage = 'ENGLISH' | 'FRENCH' | 'GERMAN' | 'ARABIC' | 'SPANISH';

export interface CareerFact {
  id: string;
  profileId: string;
  factType: string;
  description: string;
  source: FactSource;
  isVerified: boolean;
  createdAt: string;
}

export interface CareerProfile {
  id: string;
  professionalSummary: string;
  targetRoles: string;
  preferredLocations: string;
  remotePreference: string;
  availability: string;
  facts: CareerFact[];
}

export interface CVSummary {
  id: string;
  name: string;
  targetRole: string;
  targetMarket: string;
  language: CVLanguage;
  status: CVStatus;
  template: string;
  version: number;
  sourceJobId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CV extends CVSummary {
  professionalSummary: string;
  whatIBring: string;
  coreSkills: string;
  experienceSection: string;
  educationSection: string;
  usedFactIds: string;
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  source: string;
  url: string;
  matchScore: number;
  status: string;
  publicationDate: string;
}

export interface Document {
  id: string;
  originalFilename: string;
  contentType: string;
  documentType: string;
  parseStatus: 'PENDING' | 'PARSED' | 'FAILED';
  fileSizeBytes: number;
  uploadedAt: string;
}

export interface Application {
  id: string;
  status: string;
  appliedAt: string;
  opportunity: JobOpportunity;
}
