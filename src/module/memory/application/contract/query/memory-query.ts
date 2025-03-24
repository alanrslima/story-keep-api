export interface MemoryQuery {
  list(input: MemoryQueryListInput): Promise<MemoryQueryListOutput[]>;
  detail(
    input: MemoryQueryDetailInput
  ): Promise<MemoryQueryDetailOutput | undefined>;
  listMedia(
    input: MemoryQueryListMediaInput
  ): Promise<MemoryQueryListMediaOutput[]>;
}

export type MemoryQueryListInput = {
  userId: string;
};

export type MemoryQueryListOutput = {
  id: string;
  name: string;
  date: Date;
  photosCount: number;
  videosCount: number;
  coverPhoto?: {
    id: string;
    name: string;
    url: string;
  };
};

export type MemoryQueryDetailInput = {
  userId: string;
  memoryId: string;
};

export type MemoryQueryDetailOutput = {
  id: string;
  name: string;
  date: Date;
  photosCount: number;
  videosCount: number;
  createdAt: Date;
  status: string;
  mediaUrl: string;
  about: string;
  media: {
    id: string;
    name: string;
    mimetype: string;
  }[];
  coverPhoto?: {
    id: string;
    name: string;
    url: string;
  };
};

export type MemoryQueryListMediaInput = {
  page: number;
  userId: string;
  memoryId: string;
};

export type MemoryQueryListMediaOutput = {
  userId: string;
};
