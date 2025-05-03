// In-memory database store for build guides
// This would be replaced with a real database in production

export interface BuildStep {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  orderIndex: number;
  tips?: string[];
  warnings?: string[];
  requiredTools?: string[];
  estimatedTime?: string; // e.g., "10 minutes"
}

export interface BuildGuide {
  id: string;
  buildId?: string; // Reference to a specific build this guide is for
  title: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string; // e.g., "2 hours"
  steps: BuildStep[];
  views: number;
  likes: number;
  thumbnailUrl?: string;
  tags?: string[];
}

// Global variable to store guides across API routes
const guidesStore: Record<string, BuildGuide> = {};

export function getAllGuides(): BuildGuide[] {
  return Object.values(guidesStore);
}

export function getGuideById(id: string): BuildGuide | null {
  return guidesStore[id] || null;
}

export function getGuidesByBuildId(buildId: string): BuildGuide[] {
  return Object.values(guidesStore).filter(guide => guide.buildId === buildId);
}

export function createGuide(guideData: Partial<BuildGuide> & { id: string }): BuildGuide {
  const guide: BuildGuide = {
    steps: [],
    createdAt: new Date().toISOString(),
    views: 0,
    likes: 0,
    title: 'Untitled Guide',
    description: '',
    difficulty: 'beginner',
    estimatedTime: 'Unknown',
    ...guideData,
  };
  
  guidesStore[guide.id] = guide;
  return guide;
}

export function updateGuide(id: string, updateData: Partial<BuildGuide>): BuildGuide | null {
  if (!guidesStore[id]) return null;
  
  guidesStore[id] = {
    ...guidesStore[id],
    ...updateData,
    updatedAt: new Date().toISOString(),
  };
  
  return guidesStore[id];
}

export function deleteGuide(id: string): boolean {
  if (!guidesStore[id]) return false;
  
  delete guidesStore[id];
  return true;
}

export function incrementGuideViews(id: string): boolean {
  if (!guidesStore[id]) return false;
  
  guidesStore[id].views += 1;
  return true;
}

export function incrementGuideLikes(id: string): boolean {
  if (!guidesStore[id]) return false;
  
  guidesStore[id].likes += 1;
  return true;
}

export function getPopularGuides(limit: number = 10): BuildGuide[] {
  return Object.values(guidesStore)
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}