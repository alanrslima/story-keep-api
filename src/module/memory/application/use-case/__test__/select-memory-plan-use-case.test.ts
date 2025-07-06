import { Memory } from "../../../domain/entity/memory";
import { Plan } from "../../../domain/entity/plan";
import { MemoryMemoryRepository } from "../../../infra/repository/memory/memory-memory-repository";
import { PlanMemoryRepository } from "../../../infra/repository/memory/plan-memory-repository";
import { SelectMemoryPlanUseCase } from "../select-memory-plan-use-case";

it("should select memory plan", async () => {
  const plan = Plan.create({
    currencyCode: "BRL",
    description: "desc",
    name: "name",
    photosLimit: 100,
    position: 1,
    priceCents: 4999,
    videosLimit: 50,
  });
  const memory = Memory.create({ userId: "1" });
  const memoryRepository = new MemoryMemoryRepository([memory]);
  const planRepository = new PlanMemoryRepository([plan]);
  const selectMemoryPlanUseCase = new SelectMemoryPlanUseCase(
    memoryRepository,
    planRepository
  );
  await selectMemoryPlanUseCase.execute({
    memoryId: memory.getId(),
    planId: plan.getId(),
    userId: memory.getUserId(),
  });
  expect(memoryRepository.data[0].getPlan()).toBeDefined();
  expect(memoryRepository.data[0].getPlan()).toEqual(plan);
});
