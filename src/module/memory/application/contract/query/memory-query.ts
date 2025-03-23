export interface MemoryQuery {
  list(input: MemoryQueryListInput): Promise<MemoryQueryListOutput[]>;
  detail(input: MemoryQueryDetailInput): Promise<MemoryQueryDetailOutput>;
  listGallery(
    input: MemoryQueryListGalleryInput
  ): Promise<MemoryQueryListGalleryOutput[]>;
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
  qrcode: string;
  about: string;
  registers: {
    id: string;
    name: string;
    url: string;
  }[];
  coverPhoto?: {
    id: string;
    name: string;
    url: string;
  };
};

export type MemoryQueryListGalleryInput = {
  userId: string;
  memoryId: string;
};

export type MemoryQueryListGalleryOutput = {
  userId: string;
};
