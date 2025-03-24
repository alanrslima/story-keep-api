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
    const { url } = await this.storageGateway.getSignedGetUrl(
      media.getFilename(),
      { expiresIn: 30 }
    );
    return { url };
  }
}

export type Input = {
  mediaRegistryId: string;
  session: { user: { id: string } };
};

export type Output = {
  url: string;
};
