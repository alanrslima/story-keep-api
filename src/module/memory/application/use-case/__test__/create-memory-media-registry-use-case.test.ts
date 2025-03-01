import { Memory } from "../../../domain/entity/memory";
import { Plan } from "../../../domain/entity/plan";
import { StorageMemoryGateway } from "../../../infra/gateway/memory/storage-memory-gateway";
import { MediaRegistryMemoryRepository } from "../../../infra/repository/memory/media-registry-memory-repository";
import { MemoryMemoryRepository } from "../../../infra/repository/memory/memory-memory-repository";
import { CreateMemoryMediaRegistryUseCase } from "../create-memory-media-registry-use-case";

it("should update media counter at memory after create", async () => {
  const plan = Plan.create({
    currency: "BRL",
    description: "desc",
    name: "name",
    price: 10,
    photosLimit: 1,
    videosLimit: 2,
  });
  const memory = Memory.create({
    date: new Date(),
    name: "name",
    plan,
    userId: "123",
  });
  const memoryRepository = new MemoryMemoryRepository([memory]);
  const mediaRegistryRepository = new MediaRegistryMemoryRepository();
  const storageGateway = new StorageMemoryGateway();
  const createMemoryMediaRegistryUseCase = new CreateMemoryMediaRegistryUseCase(
    memoryRepository,
    mediaRegistryRepository,
    storageGateway
  );
  expect(memoryRepository.data[0].getPhotosCount()).toEqual(0);
  await createMemoryMediaRegistryUseCase.execute({
    memoryId: memory.getId(),
    mimetype: "image/png",
    personaId: "123",
  });
  expect(memoryRepository.data).toHaveLength(1);
  expect(memoryRepository.data[0].getPhotosCount()).toEqual(1);
});

it("should not create a registry if the memory plan is full", async () => {
  const plan = Plan.create({
    currency: "BRL",
    description: "desc",
    name: "name",
    price: 10,
    photosLimit: 1,
    videosLimit: 2,
  });
  const memory = Memory.create({
    date: new Date(),
    name: "name",
    plan,
    userId: "123",
  });
  const memoryRepository = new MemoryMemoryRepository([memory]);
  const mediaRegistryRepository = new MediaRegistryMemoryRepository();
  const storageGateway = new StorageMemoryGateway();
  const createMemoryMediaRegistryUseCase = new CreateMemoryMediaRegistryUseCase(
    memoryRepository,
    mediaRegistryRepository,
    storageGateway
  );
  await createMemoryMediaRegistryUseCase.execute({
    memoryId: memory.getId(),
    mimetype: "image/png",
    personaId: "123",
  });
  await createMemoryMediaRegistryUseCase.execute({
    memoryId: memory.getId(),
    mimetype: "video/mp4",
    personaId: "123",
  });
  try {
    await createMemoryMediaRegistryUseCase.execute({
      memoryId: memory.getId(),
      mimetype: "image/png",
      personaId: "123",
    });
  } catch (error) {
    expect(error).toBeDefined();
  }
});
