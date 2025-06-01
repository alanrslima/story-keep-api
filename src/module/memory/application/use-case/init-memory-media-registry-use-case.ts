import { StorageGateway } from "../contract/gateway/storage-gateway";
import { MemoryRepository } from "../contract/repository/memory-repository";
import { MediaRegistryRepository } from "../contract/repository/media-registry-repository";
import { UseCase } from "../../../common";

export class InitMemoryMediaRegistryUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly memoryRepository: MemoryRepository,
    private readonly mediaRegistryRepository: MediaRegistryRepository,
    private readonly storageGateway: StorageGateway
  ) {}

  async execute(input: Input): Promise<Output> {
    const memory = await this.memoryRepository.getById(input.memoryId);
    const mediaRegistry = memory.createMediaRegistry(
      input.mimetype,
      input.size,
      input.personaId
    );
    await this.mediaRegistryRepository.create(mediaRegistry);
    await this.memoryRepository.update(memory);
    const { url } = await this.storageGateway.getSignedUploadUrl(
      mediaRegistry.getFilename(),
      {
        expiresIn: 20,
        contentLength: mediaRegistry.getSize(),
        contentType: mediaRegistry.getMimetype(),
      }
    );
    return {
      url,
      mediaRegistryId: mediaRegistry.getId(),
      filename: mediaRegistry.getFilename(),
    };
  }
}

export type Input = {
  memoryId: string;
  personaId: string;
  mimetype: string;
  size: number;
};

export type Output = {
  mediaRegistryId: string;
  filename: string;
  url: string;
};
