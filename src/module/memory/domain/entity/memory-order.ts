import { ID } from "../../../common";
import { Order, OrderConstructor, OrderStatusEnum } from "../../../payment";

type MemoryOrderCreate = {
  memoryId: string;
};

type MemoryOrderBuild = OrderConstructor & MemoryOrderCreate;

export class MemoryOrder extends Order {
  private memoryId: ID;

  private constructor(props: MemoryOrderBuild) {
    super(props);
    this.memoryId = new ID(props.memoryId);
  }

  static create(props: MemoryOrderCreate): MemoryOrder {
    return new MemoryOrder({
      ...props,
      id: new ID().getValue(),
      status: OrderStatusEnum.CREATED,
    });
  }

  getMemoryId(): string {
    return this.memoryId.getValue();
  }
}
