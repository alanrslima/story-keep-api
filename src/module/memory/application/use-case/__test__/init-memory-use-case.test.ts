import { MemoryStatus } from "../../../domain/entity/memory";
import { MemoryMemoryRepository } from "../../../infra/repository/memory/memory-memory-repository";
import { InitMemoryUseCase } from "../init-memory-use-case";

it("A user shoud init a memory with draft status", async () => {
  const memoryRepository = new MemoryMemoryRepository();
  const initMemoryUseCase = new InitMemoryUseCase(memoryRepository);
  await initMemoryUseCase.execute({ userId: "123" });
  expect(memoryRepository.data).toHaveLength(1);
  expect(memoryRepository.data[0].getUserId()).toEqual("123");
  expect(memoryRepository.data[0].getStatus()).toEqual(MemoryStatus.DRAFT);
});
