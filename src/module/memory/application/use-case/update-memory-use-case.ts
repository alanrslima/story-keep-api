import { UseCase } from "../../../common";
import { Address } from "../../../geolocation";
import { Image } from "../../domain/entity/image";
import { ForbiddenError } from "../../error/forbidden-error";
import { StorageGateway } from "../contract/gateway/storage-gateway";
import { UnitOfWorkMemory } from "../contract/unit-of-work-memory";

export class UpdateMemoryUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly unitOfWorkMemory: UnitOfWorkMemory,
    private readonly storageGateway: StorageGateway
  ) {}

  private hasValue(value: unknown): boolean {
    return value != null && value != undefined;
  }

  async execute(input: Input): Promise<void> {
    const memory = await this.unitOfWorkMemory.execute(({ memoryRepository }) =>
      memoryRepository.getById(input.id)
    );
    if (memory.getUserId() !== input.userId) throw new ForbiddenError();
    if (this.hasValue(input.name)) memory.setName(input.name!);
    if (this.hasValue(input.about)) memory.setAbout(input.about!);
    if (this.hasValue(input.startDate))
      memory.setStartDate(new Date(input.startDate!));
    if (this.hasValue(input.automaticGuestApproval))
      memory.setAutomaticGuestApproval(input.automaticGuestApproval!);
    if (this.hasValue(input.address)) {
      const address = Address.create({
        country: input.address?.country!,
        countryCode: input.address?.countryCode!,
        state: input.address?.state!,
        city: input.address?.city!,
        neighborhood: input.address?.neighborhood!,
        longitude: input.address?.longitude!,
        latitude: input.address?.latitude!,
        addressLine1: input.address?.addressLine1!,
        addressLine2: input.address?.addressLine2!,
        postcode: input.address?.postcode!,
        formatted: [
          input.address?.addressLine1,
          input.address?.addressLine2,
        ].join(", "),
      });
      memory.setAddress(address);
    }
    let image: Image | undefined = undefined;
    if (this.hasValue(input.file)) {
      image = Image.create({
        mimetype: input.file!.mimetype,
        size: input.file!.size,
        buffer: input.file!.buffer,
      });
      await this.storageGateway.upload(image);
      if (memory.getCoverImageName()) {
        await this.storageGateway.delete(memory.getCoverImageName()!);
      }
      memory.setCoverImage(image);
    }
    await this.unitOfWorkMemory.execute(({ memoryRepository }) =>
      memoryRepository.update(memory)
    );
  }
}

export type Input = {
  id: string;
  name?: string;
  about?: string;
  automaticGuestApproval?: boolean;
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
