import { UseCase } from "../../../common";
import { MediaRegistryRepository } from "../contract/repository/media-registry-repository";

export class ConfirmMemoryMediaRegistryUseCase
  implements UseCase<Input, Output>
{
  constructor(
    private readonly mediaRegistryRepository: MediaRegistryRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const mediaRegistry = await this.mediaRegistryRepository.getById(
      input.mediaRegistryId
    );
    mediaRegistry.confirm(input.personaId, input.filename);
    await this.mediaRegistryRepository.update(mediaRegistry);
  }
}

export type Input = {
  mediaRegistryId: string;
  personaId: string;
  filename: string;
};

export type Output = void;
