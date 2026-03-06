"use client";

import { mfInstance } from '@/lib/mf-init';

export const loadRemoteComponent = async (
  scope: string,
  moduleName: string,
) => {
  try {
    // The instance is initialized in mf-init.ts and imported here
    if (!mfInstance) {
      throw new Error('Module Federation Runtime not initialized. Make sure mf-init.ts is imported first.');
    }
    // Use the instance method to load remote, not the global function
    const container = await mfInstance.loadRemote(`${scope}/${moduleName}`);
    return container as any;
  } catch (error) {
    console.error(`Failed to load remote ${scope}/${moduleName}:`, error);
    throw error;
  }
};
