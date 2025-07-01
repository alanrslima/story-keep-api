import { ID } from "../../../common";
import { Coupon, CouponType } from "./coupon";

export enum MemoryOrderStatus {
  CREATED = "created",
  AWAITING_PAYMENT = "awaiting_payment",
  PAYMENT_FAILED = "payment_failed",
  CANCELED = "canceled",
  READY = "ready",
}

type MemoryOrderCreate = {
  memoryId: string;
  priceCents: number;
  userId: string;
};

type MemoryOrderBuild = MemoryOrderCreate & {
  id: string;
  status: MemoryOrderStatus;
  purchasedAt: Date;
  totalCents: number;
  discountCents: number;
  couponId?: string;
};

export class MemoryOrder {
  private id: ID;
  private memoryId: ID;
  private userId: ID;
  private priceCents: number;
  private couponId?: string;
  private discountCents: number;
  private totalCents: number;
  private purchasedAt: Date;
  private status: MemoryOrderStatus;

  private constructor(props: MemoryOrderBuild) {
    this.id = new ID(props.id);
    this.memoryId = new ID(props.memoryId);
    this.priceCents = props.priceCents;
    this.userId = new ID(props.userId);
    this.couponId = props.couponId;
    this.discountCents = props.discountCents;
    this.totalCents = props.totalCents;
    this.purchasedAt = props.purchasedAt;
    this.status = props.status;
  }

  public static create(props: MemoryOrderCreate) {
    return new MemoryOrder({
      ...props,
      id: new ID().getValue(),
      discountCents: 0,
      purchasedAt: new Date(),
      status: MemoryOrderStatus.CREATED,
      totalCents: props.priceCents,
    });
  }

  applyCoupon(coupon: Coupon) {
    const newValue = coupon.applyDiscount(
      this.priceCents,
      this.userId.getValue()
    );
    this.discountCents = this.priceCents = newValue;
    this.totalCents = newValue;
    this.couponId = coupon.getId();
  }

  getId(): string {
    return this.id.getValue();
  }

  getMemoryId(): string {
    return this.memoryId.getValue();
  }

  getPriceCents(): number {
    return this.priceCents;
  }
}
