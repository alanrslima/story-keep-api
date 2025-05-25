import { UseCase } from "../../../common";
import { MediaRegistryForbiddenError } from "../../error/media-registry-forbidden-error";
import { StorageGateway } from "../contract/gateway/storage-gateway";
import { MediaRegistryRepository } from "../contract/repository/media-registry-repository";
import { MemoryRepository } from "../contract/repository/memory-repository";

export class ReadMediaRegistryUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly storageGateway: StorageGateway,
    private readonly mediaRegistryRepository: MediaRegistryRepository,
    private readonly memoryRepository: MemoryRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const media = await this.mediaRegistryRepository.getById(
      input.mediaRegistryId
    );
    const memory = await this.memoryRepository.getById(media.getMemoryId());
    if (memory.getUserId() !== input.session.user.id)
      throw new MediaRegistryForbiddenError();
    const expiresIn = 30;
    const { url } = await this.storageGateway.getSignedGetUrl(
      media.getFilename(),
      { expiresIn }
    );
    const expiresAt = this.addSeconds(new Date(), expiresIn).toISOString();
    return { url, expiresAt };
  }

  private addSeconds(date: Date, seconds: number) {
    const newDate = new Date(date);
    newDate.setSeconds(newDate.getSeconds() + seconds);
    return newDate;
  }
}

export type Input = {
  mediaRegistryId: string;
  session: { user: { id: string } };
};

export type Output = {
  url: string;
  expiresAt: string;
};
