export interface ProductCollection {
    id: string;
    title: string;
    handle: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    metadata?: Record<string, any> | null;
    isActive: boolean;
  }
  