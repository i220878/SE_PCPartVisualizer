// In-memory database store for community builds with photos
// This would be replaced with a real database in production

export interface BuildImage {
  id: string;
  url: string;
  caption?: string;
  isPrimary: boolean;
  orderIndex: number;
}

export interface CommunityBuild {
  id: string;
  buildId: string; // Reference to the main build
  userId: string;
  username: string;
  title: string;
  description: string;
  specs: Record<string, any>; // Full specs details
  images: BuildImage[];
  tags: string[];
  createdAt: string;
  updatedAt?: string;
  views: number;
  likes: number;
  comments: number;
  featured: boolean;
}

// Global variable to store community builds across API routes
const communityBuildsStore: Record<string, CommunityBuild> = {};

export function getAllCommunityBuilds(): CommunityBuild[] {
  return Object.values(communityBuildsStore);
}

export function getCommunityBuildById(id: string): CommunityBuild | null {
  return communityBuildsStore[id] || null;
}

export function getCommunityBuildsByUserId(userId: string): CommunityBuild[] {
  return Object.values(communityBuildsStore)
    .filter(build => build.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function createCommunityBuild(buildData: Partial<CommunityBuild> & { 
  id: string; 
  buildId: string; 
  userId: string;
  username: string;
}): CommunityBuild {
  const build: CommunityBuild = {
    title: 'Untitled Build',
    description: '',
    specs: {},
    images: [],
    tags: [],
    createdAt: new Date().toISOString(),
    views: 0,
    likes: 0,
    comments: 0,
    featured: false,
    ...buildData,
  };
  
  communityBuildsStore[build.id] = build;
  return build;
}

export function updateCommunityBuild(id: string, updateData: Partial<CommunityBuild>): CommunityBuild | null {
  if (!communityBuildsStore[id]) return null;
  
  communityBuildsStore[id] = {
    ...communityBuildsStore[id],
    ...updateData,
    updatedAt: new Date().toISOString(),
  };
  
  return communityBuildsStore[id];
}

export function deleteCommunityBuild(id: string): boolean {
  if (!communityBuildsStore[id]) return false;
  
  delete communityBuildsStore[id];
  return true;
}

export function incrementCommunityBuildViews(id: string): boolean {
  if (!communityBuildsStore[id]) return false;
  
  communityBuildsStore[id].views += 1;
  return true;
}

export function incrementCommunityBuildLikes(id: string): boolean {
  if (!communityBuildsStore[id]) return false;
  
  communityBuildsStore[id].likes += 1;
  return true;
}

export function incrementCommunityBuildComments(id: string): boolean {
  if (!communityBuildsStore[id]) return false;
  
  communityBuildsStore[id].comments += 1;
  return true;
}

export function getFeaturedCommunityBuilds(limit: number = 5): CommunityBuild[] {
  return Object.values(communityBuildsStore)
    .filter(build => build.featured)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export function getPopularCommunityBuilds(limit: number = 10): CommunityBuild[] {
  return Object.values(communityBuildsStore)
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}