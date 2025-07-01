import { ID } from "../../../common";

export type CouponBaseCreate = {
  code: string;
  value: number;
  maxUses?: number;
  usedCount: number;
  userId?: string;
  expiresAt?: Date;
  type: CouponType;
};

export type CouponBaseBuild = CouponBaseCreate & {
  id: string;
};

export enum CouponType {
  FIXED = "fixed",
  PERCENTAGE = "percentage",
}

export class Coupon {
  private id: ID;
  private type: CouponType;
  private code: string; // Ex: "WELCOME123" ou "LANÇAMENTO10"
  private value: number; // Ex: 10 (%)
  private maxUses?: number;
  private usedCount: number; // aumenta a cada uso
  private userId?: ID; // null = qualquer usuário pode usar
  private expiresAt?: Date;

  constructor(props: CouponBaseBuild) {
    this.id = new ID(props.id);
    this.code = props.code;
    this.value = props.value;
    this.maxUses = props.maxUses;
    this.usedCount = props.usedCount;
    this.userId = new ID(props.userId);
    this.expiresAt = props.expiresAt;
    this.type = props.type;
  }

  applyDiscount(originalPrice: number, userId: string): number {
    if (!this.isValid(userId)) return originalPrice;
    if (this.type === CouponType.FIXED) {
      return Math.max(0, originalPrice - this.getValue());
    } else if (this.type === CouponType.PERCENTAGE) {
      return originalPrice - (originalPrice * this.getValue()) / 100;
    } else {
      return originalPrice;
    }
  }

  isValid(userId: string): boolean {
    if (this.userId && userId !== this.userId.getValue()) {
      return false;
    }
    if (this.expiresAt) {
      return new Date() <= this.expiresAt;
    }
    return true;
  }

  getId(): string {
    return this.id.getValue();
  }

  getCode(): string {
    return this.code;
  }

  getValue(): number {
    return this.value;
  }

  getMaxUses(): number | undefined {
    return this.maxUses;
  }

  getUsedCount(): number | undefined {
    return this.usedCount;
  }

  getUserId(): string | undefined {
    return this.userId?.getValue();
  }

  getExpiredAt(): Date | undefined {
    return this.expiresAt;
  }
}
