import { Memory, MemoryStatus } from "../memory";
import { Plan } from "../plan";

it("should create a memory with created status as default", () => {
  const plan = Plan.create({
    description: "plan description",
    name: "plan name",
    price: 10,
    currencyCode: "BRL",
    photosLimit: 10,
    videosLimit: 10,
  });
  const memory = Memory.create({
    date: new Date(),
    name: "Memory #1",
    plan,
    userId: "123",
  });
  expect(memory.getStatus()).toEqual(MemoryStatus.CREATED);
});
