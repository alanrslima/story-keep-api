import { ID } from "../../../common";
import { Order, OrderConstructor } from "../../../payment";
import { OrderStatus } from "../../../payment/domain/enum/order-status";

type MemoryOrderCreate = {
  memoryId: string;
  userId: string;
  total: number;
  discount: number;
  price: number;
  currencyCode: string;
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
      status: OrderStatus.AWAITING_PAYMENT,
    });
  }

  static build(props: MemoryOrderBuild): MemoryOrder {
    return new MemoryOrder(props);
  }

  getMemoryId(): string {
    return this.memoryId.getValue();
  }
}
