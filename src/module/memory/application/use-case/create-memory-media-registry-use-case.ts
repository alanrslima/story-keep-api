import { MediaRegistry } from "../../domain/entity/media-registry";
import { StorageGateway } from "../contract/gateway/storage-gateway";
import { MemoryRepository } from "../contract/repository/memory-repository";
import { MediaRegistryRepository } from "../contract/repository/media-registry-repository";
import { UseCase } from "../contract/use-case";

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
      throw new Error("Limit of registry");
    }
    const mediaRegistry = MediaRegistry.create({
      memoryId: memory.getId(),
      mimetype: input.mimetype,
      personaId: input.personaId,
    });
    await this.mediaRegistryRepository.create(mediaRegistry);
    const { token } = await this.storageGateway.getSignedUploadToken();
    return {
      token,
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
  token: string;
};
