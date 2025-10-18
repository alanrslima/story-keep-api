import { MemoryOrderRepository } from "../../../application/contract/repository/memory-order-repository";
import { MemoryOrder } from "../../../domain/entity/memory-order";
import { MemoryOrderNotFoundError } from "../../../error/memory-order-not-found-error";

export class MemoryOrderMemoryRepository implements MemoryOrderRepository {
  public data: MemoryOrder[];

  constructor(mock?: MemoryOrder[]) {
    this.data = mock || [];
  }

  setManager(): void {
    throw new Error("Method not implemented.");
  }
  async getById(id: string): Promise<MemoryOrder> {
    const item = this.data.find((i) => i.getId() === id);
    if (!item) throw new MemoryOrderNotFoundError();
    return item;
  }

  async create(memoryOrder: MemoryOrder): Promise<void> {
    this.data.push(memoryOrder);
  }

  async update(memoryOrder: MemoryOrder): Promise<void> {
    this.data = this.data.map((item) =>
      item.getId() === memoryOrder.getId() ? memoryOrder : item
    );
  }
}
