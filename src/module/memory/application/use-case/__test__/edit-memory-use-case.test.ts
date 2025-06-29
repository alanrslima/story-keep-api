import { Memory } from "../../../domain/entity/memory";
import { Plan } from "../../../domain/entity/plan";
import { ForbiddenError } from "../../../error/forbidden-error";
import { MemoryMemoryRepository } from "../../../infra/repository/memory/memory-memory-repository";
import { EditMemoryUseCase } from "../edit-memory-use-case";

it("should not edit a memory if the user is not allowed", async () => {
  const plan = Plan.create({
    currencyCode: "BRL",
    description: "plan desc",
    name: "name",
    photosLimit: 100,
    priceCents: 1000,
    videosLimit: 10,
  });
  const memory = Memory.create({
    name: "name",
    plan,
    userId: "123456",
    address: "Street #1",
    isPrivate: false,
  });
  const memoryRepository = new MemoryMemoryRepository([memory]);
  const editMemoryUseCase = new EditMemoryUseCase(memoryRepository);
  expect(
    async () =>
      await editMemoryUseCase.execute({
        memoryId: memory.getId(),
        userId: "123",
        address: "Address",
        name: "Birthday",
        startDate: new Date().toISOString(),
      })
  ).rejects.toThrow(ForbiddenError);
});

it("should edit the memory", async () => {
  const plan = Plan.create({
    currencyCode: "BRL",
    description: "plan desc",
    name: "name",
    photosLimit: 100,
    priceCents: 1000,
    videosLimit: 10,
  });
  const memory = Memory.create({
    name: "name",
    plan,
    userId: "123456",
    address: "Street #1",
    isPrivate: false,
  });
  const memoryRepository = new MemoryMemoryRepository([memory]);
  const editMemoryUseCase = new EditMemoryUseCase(memoryRepository);
  await editMemoryUseCase.execute({
    memoryId: memory.getId(),
    userId: "123456",
    address: "Address",
    name: "Birthday",
    startDate: new Date().toISOString(),
  });
  expect(memoryRepository.data[0].getName()).toEqual("Birthday");
  expect(memoryRepository.data[0].getAddress()).toEqual("Address");
});
