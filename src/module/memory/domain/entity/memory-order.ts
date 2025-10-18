import { ID } from "../../../common";
import { Order, OrderConstructor } from "../../../payment";
import { OrderStatus } from "../../../payment/domain/enum/order-status";

type MemoryOrderCreate = {
  memoryId: string;
  memoryPlanId: string;
  userId: string;
  total: number;
  discount: number;
  price: number;
  currencyCode: string;
};

type MemoryOrderBuild = OrderConstructor & MemoryOrderCreate;

export class MemoryOrder extends Order {
  private memoryId: ID;
  private memoryPlanId: ID;

  private constructor(props: MemoryOrderBuild) {
    super(props);
    this.memoryId = new ID(props.memoryId);
    this.memoryPlanId = new ID(props.memoryPlanId);
  }

  static create(props: MemoryOrderCreate): MemoryOrder {
    return new MemoryOrder({
      ...props,
      id: new ID().getValue(),
      status: OrderStatus.PENDING,
    });
  }

  static build(props: MemoryOrderBuild): MemoryOrder {
    return new MemoryOrder(props);
  }

  getMemoryId(): string {
    return this.memoryId.getValue();
  }

  getMemoryPlanId(): string {
    return this.memoryPlanId.getValue();
  }
}
