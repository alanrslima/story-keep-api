import { Memory, MemoryStatus } from "../memory";
import { Plan } from "../plan";

it("should create a memory with created status as default", () => {
  const plan = Plan.create({
    description: "plan description",
    name: "plan name",
    priceCents: 10,
    currencyCode: "BRL",
    photosLimit: 10,
    videosLimit: 10,
    position: 1,
  });
  const memory = Memory.create({
    startDate: new Date(),
    name: "Memory #1",
    plan,
    userId: "123",
    isPrivate: false,
  });
  expect(memory.getStatus()).toEqual(MemoryStatus.DRAFT);
});
