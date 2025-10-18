import { EntityManager } from "typeorm";
import { MemoryRepository } from "../../../application/contract/repository/memory-repository";
import { Memory } from "../../../domain/entity/memory";

export class MemoryMemoryRepository implements MemoryRepository {
  public data: Memory[];

  constructor(data?: Memory[]) {
    this.data = data || [];
  }
  setManager(): void {
    throw new Error("Method not implemented.");
  }

  async create(memory: Memory): Promise<void> {
    this.data.push(memory);
  }

  async getById(id: string): Promise<Memory> {
    const item = this.data.find((i) => i.getId() === id);
    if (!item) throw new Error("Memory not founded");
    return item;
  }

  async update(memory: Memory): Promise<void> {
    this.data = this.data.map((item) =>
      item.getId() === memory.getId() ? memory : item
    );
  }
}
