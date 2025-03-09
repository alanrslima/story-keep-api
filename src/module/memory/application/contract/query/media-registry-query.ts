export interface MediaRegistryQuery {
  listByMemoryId(memoryId: string): ListByMemoryIdOutput;
}

export type ListByMemoryIdOutput = {
  id: string;
  filename: string;
  mimetype: string;
  url: string;
  createdAt: Date;
};
