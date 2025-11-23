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
  memory.inviteUser("1");
  memory.inviteUser("1");
  expect(memory.getGuests().length).toEqual(1);
});

it("should add a guest", () => {
  const memory = createMemory();
  memory.inviteUser("1");
  expect(memory.getGuests()).toHaveLength(1);
  expect(memory.getGuests()[0].getStatus()).toEqual("ACCEPTED");
});

it("should accept a guest", () => {
  const memory = Memory.create({ userId: "1" });
  memory.setAutomaticGuestApproval(false);
  memory.inviteUser("2");
  memory.inviteUser("3");
  memory.inviteUser("4");
  memory.acceptGuest("2");
  expect(memory.getGuests()).toHaveLength(3);
  const acceptedGuest = memory
    .getGuests()
    .find((i) => i.getUserId() === "2")
    ?.getStatus();
  expect(acceptedGuest).toEqual("ACCEPTED");
});
