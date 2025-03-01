import { MediaRegistry } from "../../domain/entity/media-registry";
import { StorageGateway } from "../contract/gateway/storage-gateway";
import { MemoryRepository } from "../contract/repository/memory-repository";
import { MediaRegistryRepository } from "../contract/repository/media-registry-repository";
import { LimitMediaRegistryError } from "../../error/limit-media-registry-error";
import { UseCase } from "../../../common";

export class CreateMemoryMediaRegistryUseCase
  implements UseCase<Input, Output>
{
  constructor(
    private readonly memoryRepository: MemoryRepository,
    private readonly mediaRegistryRepository: MediaRegistryRepository,
    private readonly storageGateway: StorageGateway
  ) {}

  async execute(input: Input): Promise<Output> {
    const memory = await this.memoryRepository.getById(input.memoryId);
    if (!memory.canAddRegistry(input.mimetype)) {
      throw new LimitMediaRegistryError();
    }
    const mediaRegistry = MediaRegistry.create({
      memoryId: memory.getId(),
      mimetype: input.mimetype,
      personaId: input.personaId,
    });
    memory.updateRegistryCounter(mediaRegistry);
    await this.mediaRegistryRepository.create(mediaRegistry);
    const { url } = await this.storageGateway.getSignedUploadUrl();
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
};

export type Output = {
  mediaRegistryId: string;
  filename: string;
  url: string;
};
