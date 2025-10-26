export interface MemoryQuery {
  getGuest(input: MemoryQueryGetGuestInput): Promise<MemoryQueryGetGuestOutput>;
  list(input: MemoryQueryListInput): Promise<MemoryQueryListOutput[]>;
  resume(input: MemoryQueryResumeInput): Promise<MemoryQueryResumeOutput>;
  detail(
    input: MemoryQueryDetailInput
  ): Promise<MemoryQueryDetailOutput | undefined>;
  listMedia(
    input: MemoryQueryListMediaInput
  ): Promise<MemoryQueryListMediaOutput[]>;
}

export type MemoryQueryGetGuestInput = {
  memoryId: string;
  userId: string;
};

export type MemoryQueryGetGuestOutput = {
  status: string;
  createdAt: string;
};

export type MemoryQueryResumeInput = {
  memoryId: string;
};
export type MemoryQueryResumeOutput = {
  id: string;
  name: string;
  privacyMode: string;
  startDate: Date;
  address?: string;
  coverImage?: {
    url: string;
  };
};

export type MemoryQueryListInput = {
  userId: string;
};

export type MemoryQueryListOutput = {
  id: string;
  name: string;
  startDate: Date;
  privacyMode: string;
  address?: string;
  photosCount: number;
  status: string;
  videosCount: number;
  coverImage?: {
    url: string;
  };
};

export type MemoryQueryDetailInput = {
  memoryId: string;
  userId: string;
};

export type MemoryQueryDetailOutput = {
  id: string;
  name: string;
  privacyMode: string;
  startDate: Date;
  address?: string;
  photosCount: number;
  videosCount: number;
  createdAt: Date;
  status: string;
  mediaUrl: string;
  about: string;
  guests: {
    id: string;
    name: string;
    email: string;
    profileUrl: string;
    status: string;
  }[];
  plan?: {
    currencyCode: string;
    description: string;
    id: string;
    name: string;
    price: number;
    photosLimit: number;
    videosLimit: number;
  };
  media: {
    id: string;
    name: string;
    mimetype: string;
    url: string;
  }[];
  coverImage?: {
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
