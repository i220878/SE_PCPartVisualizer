// In-memory database store for PC builds
// This would be replaced with a real database in production

export interface Component {
  id: string;
  type: string;
  name: string;
  brand: string;
  price: number;
  specs: Record<string, any>;
}

export interface PCBuild {
  id: string;
  name: string;
  description?: string;
  components: Component[];
  totalPrice: number;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  userId?: string;
  isShared: boolean;
  shareDate?: string;
  shareableUrl?: string;
  views: number;
  likes: number;
}

// Global variable to store builds across API routes
const buildsStore: Record<string, PCBuild> = {};

export function getAllBuilds(): PCBuild[] {
  return Object.values(buildsStore);
}

export function getBuildById(id: string): PCBuild | null {
  return buildsStore[id] || null;
}

export function createBuild(buildData: Partial<PCBuild> & { id: string }): PCBuild {
  // Calculate total price from components if not provided
  let totalPrice = buildData.totalPrice || 0;
  if (!totalPrice && buildData.components) {
    totalPrice = buildData.components.reduce((sum, component) => sum + (component.price || 0), 0);
  }

  const build: PCBuild = {
    components: [],
    createdAt: new Date().toISOString(),
    isShared: false,
    views: 0,
    likes: 0,
    totalPrice,
    name: 'Unnamed Build',
    ...buildData,
  };
  
  buildsStore[build.id] = build;
  return build;
}

export function updateBuild(id: string, updateData: Partial<PCBuild>): PCBuild | null {
  if (!buildsStore[id]) return null;
  
  // If components are updated, recalculate total price
  let totalPrice = buildsStore[id].totalPrice;
  if (updateData.components) {
    totalPrice = updateData.components.reduce((sum, component) => sum + (component.price || 0), 0);
  }
  
  buildsStore[id] = {
    ...buildsStore[id],
    ...updateData,
    totalPrice,
    updatedAt: new Date().toISOString(),
  };
  
  return buildsStore[id];
}

export function deleteBuild(id: string): boolean {
  if (!buildsStore[id]) return false;
  
  delete buildsStore[id];
  return true;
}

export function shareBuild(id: string): PCBuild | null {
  if (!buildsStore[id]) return null;
  
  buildsStore[id].isShared = true;
  buildsStore[id].shareDate = new Date().toISOString();
  buildsStore[id].shareableUrl = `/builds/${id}`;
  
  return buildsStore[id];
}

export function incrementBuildViews(id: string): boolean {
  if (!buildsStore[id]) return false;
  
  buildsStore[id].views += 1;
  return true;
}

export function incrementBuildLikes(id: string): boolean {
  if (!buildsStore[id]) return false;
  
  buildsStore[id].likes += 1;
  return true;
}

export function getSharedBuilds(): PCBuild[] {
  return Object.values(buildsStore)
    .filter(build => build.isShared)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getUserBuilds(userId: string): PCBuild[] {
  return Object.values(buildsStore)
    .filter(build => build.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}