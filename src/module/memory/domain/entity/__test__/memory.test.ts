import { MemoryStatus } from "../../enum/memory-status";
import { Memory } from "../memory";
import { Plan } from "../plan";

const createMemory = () => {
  const plan = Plan.create({
    description: "plan description",
    name: "plan name",
    priceCents: 10,
    currencyCode: "BRL",
    photosLimit: 10,
    videosLimit: 10,
    position: 1,
  });
  return Memory.create({
    startDate: new Date(),
    name: "Memory #1",
    plan,
    userId: "123",
    isPrivate: false,
  });
};

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

it("should not invite the memory owner as a guest", () => {
  const memory = createMemory();
  expect(() => memory.inviteUser("123")).toThrow(
    "The owner can not be invited"
  );
});

it("should not duplicate the guests", () => {
  const memory = createMemory();
  memory.inviteUser("1");
  expect(() => memory.inviteUser("1")).toThrow(
    "User already invited to this memory."
  );
});

it("should add a guest", () => {
  const memory = createMemory();
  memory.inviteUser("1");
  expect(memory.getGuests()).toHaveLength(1);
  expect(memory.getGuests()[0].getStatus()).toEqual("ACCEPTED");
});
