import { UseCase } from "../../../common";
import { Address } from "../../../geolocation";
import { Image } from "../../domain/entity/image";
import { ForbiddenError } from "../../error/forbidden-error";
import { StorageGateway } from "../contract/gateway/storage-gateway";
import { MemoryRepository } from "../contract/repository/memory-repository";

export class UpdateMemoryUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly memoryRepository: MemoryRepository,
    private readonly storageGateway: StorageGateway
  ) {}

  async execute(input: Input): Promise<void> {
    const memory = await this.memoryRepository.getById(input.id);
    if (memory.getUserId() !== input.userId) throw new ForbiddenError();
    if (input.name) memory.setName(input.name);
    if (input.about) memory.setAbout(input.about);
    if (input.startDate) memory.setStartDate(new Date(input.startDate));
    if (input.address) {
      const address = Address.create({
        country: input.address?.country,
        countryCode: input.address?.countryCode,
        state: input.address?.state,
        city: input.address?.city,
        neighborhood: input.address?.neighborhood,
        longitude: input.address?.longitude,
        latitude: input.address?.latitude,
        addressLine1: input.address?.addressLine1,
        addressLine2: input.address?.addressLine2,
        postcode: input.address?.postcode,
      });
      memory.setAddress(address);
    }
    let image: Image | undefined = undefined;
    if (input.file) {
      image = Image.create({
        mimetype: input.file.mimetype,
        size: input.file.size,
        buffer: input.file.buffer,
      });
      await this.storageGateway.upload(image);
      if (memory.getCoverImageName()) {
        await this.storageGateway.delete(memory.getCoverImageName()!);
      }
      memory.setCoverImage(image);
    }
    await this.memoryRepository.update(memory);
  }
}

export type Input = {
  id: string;
  name?: string;
  about?: string;
  startDate?: string;
  address?: {
    country: string;
    countryCode: string;
    state: string;
    city: string;
    neighborhood: string;
    longitude: number;
    latitude: number;
    addressLine1: string;
    addressLine2: string;
    postcode: string;
  };
  privacyMode?: string;
  file?: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
  };
  userId: string;
};

export type Output = void;
