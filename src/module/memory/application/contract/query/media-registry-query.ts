export interface MediaRegistryQuery {
  listByUserId(
    input: MediaRegistryQueryListByUserIdInput
  ): Promise<MediaRegistryQueryListByUserIdOutput[]>;
}

export type MediaRegistryQueryListByUserIdInput = {
  userId: string;
  page?: number;
};

export type MediaRegistryQueryListByUserIdOutput = {
  id: string;
  filename: string;
  mimetype: string;
  url: string;
  status: string;
  size: number;
  createdAt: Date;
  expiresAt: string;
};
