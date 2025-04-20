"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Component, PCBuild } from "./types"

interface BuildState {
  currentBuild: PCBuild
  savedBuilds: PCBuild[]
  addComponent: (component: Component) => void
  removeComponent: (componentId: string) => void
  clearBuild: () => void
  saveBuild: (build: PCBuild) => void
  loadBuild: (buildId: string) => void
  deleteBuild: (buildId: string) => void
  duplicateBuild: (buildId: string) => void
}

export const useBuildStore = create<BuildState>()(
  persist(
    (set) => ({
      currentBuild: {
        id: "current",
        name: "Current Build",
        date: new Date().toISOString(),
        components: [],
      },
      savedBuilds: [],

      addComponent: (component) =>
        set((state) => {
          // Remove any existing component of the same category
          const filteredComponents = state.currentBuild.components.filter((c) => c.category !== component.category)

          return {
            currentBuild: {
              ...state.currentBuild,
              components: [...filteredComponents, component],
            },
          }
        }),

      removeComponent: (componentId) =>
        set((state) => ({
          currentBuild: {
            ...state.currentBuild,
            components: state.currentBuild.components.filter((component) => component.id !== componentId),
          },
        })),

      clearBuild: () =>
        set((state) => ({
          currentBuild: {
            ...state.currentBuild,
            components: [],
          },
        })),

      saveBuild: (build) =>
        set((state) => ({
          savedBuilds: [...state.savedBuilds, build],
        })),

      loadBuild: (buildId) =>
        set((state) => {
          const buildToLoad = state.savedBuilds.find((build) => build.id === buildId)

          if (!buildToLoad) return state

          return {
            currentBuild: {
              ...state.currentBuild,
              components: [...buildToLoad.components],
            },
          }
        }),

      deleteBuild: (buildId) =>
        set((state) => ({
          savedBuilds: state.savedBuilds.filter((build) => build.id !== buildId),
        })),

      duplicateBuild: (buildId) =>
        set((state) => {
          const buildToDuplicate = state.savedBuilds.find((build) => build.id === buildId)

          if (!buildToDuplicate) return state

          const duplicatedBuild = {
            ...buildToDuplicate,
            id: Date.now().toString(),
            name: `${buildToDuplicate.name} (Copy)`,
            date: new Date().toISOString(),
          }

          return {
            savedBuilds: [...state.savedBuilds, duplicatedBuild],
          }
        }),
    }),
    {
      name: "pc-part-visualizer-storage",
    },
  ),
)
