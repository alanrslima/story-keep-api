import { MemoryCreatedNodeEvent } from "../../../infra/event/memory-created-node-event";

export const memoryCreatedListener = () => {
  const memoryCreatedNodeEvent = new MemoryCreatedNodeEvent();

  memoryCreatedNodeEvent.on(async (memory) => {
    try {
      console.log("memory created", memory);
    } catch (error) {}
  });
};
