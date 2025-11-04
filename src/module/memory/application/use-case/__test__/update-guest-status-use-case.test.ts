import { Memory } from "../../../domain/entity/memory";
import { MemoryMemoryRepository } from "../../../infra/repository/memory/memory-memory-repository";
import { MemoryOrderMemoryRepository } from "../../../infra/repository/memory/memory-order-memory-repository";
import { UnitOfWorkMemoryMemory } from "../../../infra/unit-of-work/unit-of-work-memory-memory";
import { UpdateGuestStatusUseCase } from "../update-guest-status-use-case";

it("should change guest status if is the memory owner", async () => {
  const memory = Memory.create({ userId: "1" });
  memory.inviteUser("2");
  const memoryRepository = new MemoryMemoryRepository([memory]);
  const unitOfWorkMemory = new UnitOfWorkMemoryMemory({
    memoryRepository,
    memoryOrderRepository: new MemoryOrderMemoryRepository(),
  });
  const updateGuestStatusUseCase = new UpdateGuestStatusUseCase(
    unitOfWorkMemory
  );
  expect(memoryRepository.data[0].getGuests()[0].getStatus()).toEqual(
    "ACCEPTED"
  );
  await updateGuestStatusUseCase.execute({
    guestId: "2",
    memoryId: memory.getId(),
    status: "DECLINED",
    userId: "1",
  });
  expect(memoryRepository.data[0].getGuests()).toHaveLength(1);
  expect(memoryRepository.data[0].getGuests()[0].getStatus()).toEqual(
    "DECLINED"
  );
});

it("should throw an error if try to change guest and is not the memory owner", async () => {
  const memory = Memory.create({ userId: "1" });
  const unitOfWorkMemory = new UnitOfWorkMemoryMemory({
    memoryRepository: new MemoryMemoryRepository([memory]),
    memoryOrderRepository: new MemoryOrderMemoryRepository(),
  });
  const updateGuestStatusUseCase = new UpdateGuestStatusUseCase(
    unitOfWorkMemory
  );
  const execute = async () =>
    await updateGuestStatusUseCase.execute({
      guestId: "123",
      memoryId: memory.getId(),
      status: "ACCEPTED",
      userId: "2",
    });
  expect(execute).rejects.toThrow("Can not update the guest status");
});

it("should throw an error if the status not exists", async () => {
  const memory = Memory.create({ userId: "1" });
  memory.inviteUser("2");
  const memoryRepository = new MemoryMemoryRepository([memory]);
  const unitOfWorkMemory = new UnitOfWorkMemoryMemory({
    memoryRepository,
    memoryOrderRepository: new MemoryOrderMemoryRepository(),
  });
  const updateGuestStatusUseCase = new UpdateGuestStatusUseCase(
    unitOfWorkMemory
  );

  const execute = async () =>
    await updateGuestStatusUseCase.execute({
      guestId: "2",
      memoryId: memory.getId(),
      status: "WRONG_STATUS",
      userId: "1",
    });
  expect(execute).rejects.toThrow("Invalid guest status");
});
