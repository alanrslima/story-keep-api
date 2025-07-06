import { Memory } from "../../../domain/entity/memory";
import { ForbiddenError } from "../../../error/forbidden-error";
import { StorageMemoryGateway } from "../../../infra/gateway/memory/storage-memory-gateway";
import { MemoryMemoryRepository } from "../../../infra/repository/memory/memory-memory-repository";
import { UpdateMemoryUseCase } from "../update-memory-use-case";

it("should not update a memory if the user is not the owner", async () => {
  const memory = Memory.create({ userId: "1" });
  const memoryRepository = new MemoryMemoryRepository([memory]);
  const storageGateway = new StorageMemoryGateway();
  const updateMemoryUseCase = new UpdateMemoryUseCase(
    memoryRepository,
    storageGateway
  );
  expect(async () => {
    await updateMemoryUseCase.execute({
      id: memory.getId(),
      userId: "2",
      address: "address",
    });
  }).rejects.toThrow(ForbiddenError);
});

it("should update a memory", async () => {
  const memory = Memory.create({ userId: "123" });
  const memoryRepository = new MemoryMemoryRepository([memory]);
  const storageGateway = new StorageMemoryGateway();
  const updateMemoryUseCase = new UpdateMemoryUseCase(
    memoryRepository,
    storageGateway
  );
  await updateMemoryUseCase.execute({
    id: memory.getId(),
    userId: memory.getUserId(),
    address: "address",
    name: "name",
    startDate: new Date().toISOString(),
    file: {
      buffer: Buffer.from(""),
      encoding: "enc",
      fieldname: "fieldname",
      mimetype: "image/png",
      originalname: "originalmane.jpg",
      size: 10000,
    },
  });
  expect(memoryRepository.data).toHaveLength(1);
  expect(memoryRepository.data[0].getName()).toEqual("name");
  expect(memoryRepository.data[0].getAddress()).toEqual("address");
  expect(memoryRepository.data[0].getStartDate()).toBeDefined();
  expect(storageGateway.data).toHaveLength(1);
});
