import { Coupon } from "../../../domain/entity/coupon";

export interface CouponRepository {
  findById(id: string): Promise<Coupon | undefined>;
}
