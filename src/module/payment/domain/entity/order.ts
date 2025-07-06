import { ID, Price } from "../../../common";
import { OrderStatus } from "../enum/order-status";
import { PaymentMethod } from "../enum/payment-method";
import { PaymentStatus } from "../enum/payment-status";

export type OrderConstructor = {
  id: string;
  status: OrderStatus;
  // notes?: string;
  // orderStatus: OrderStatus;
  // paymentStatus?: PaymentStatus;
  // paymentMethod?: PaymentMethod;
  // discountAmount?: number;
  // totalAmount?: number;
  userId: string;
};

export abstract class Order {
  private id: ID;
  private status: OrderStatus;
  private userId: ID;
  // private totalAmount: Price;
  // private discountAmount?: Price;
  // private paymentMethod?: PaymentMethod;
  // private orderStatus: OrderStatus;
  // private notes?: string;

  constructor(props: OrderConstructor) {
    this.id = new ID(props.id);
    this.userId = new ID(props.userId);
    this.status = props.status;
    // this.notes = props.notes;
    // this.orderStatus = props.orderStatus;
  }

  getId(): string {
    return this.id.getValue();
  }

  getStatus(): string {
    return this.status;
  }
}
