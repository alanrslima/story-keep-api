import { ID } from "../../../common";
import { CurrencyCode } from "../value-object/currency-code";
import { PositiveNumber } from "../value-object/positive-number";
import { Price } from "../value-object/price";
import { Discount } from "./discount";

type CreateProps = {
  name: string;
  description: string;
  priceCents: number;
  currencyCode: string;
  photosLimit: number;
  videosLimit: number;
};

type BuildProps = CreateProps & {
  id: string;
  discount?: Discount;
};

export class Plan {
  private id: ID;
  private name: string;
  private description: string;
  private currencyCode: CurrencyCode;
  private priceCents: Price;
  private discount?: Discount;
  private photosLimit: PositiveNumber;
  private videosLimit: PositiveNumber;

  private constructor(props: BuildProps) {
    this.id = new ID(props.id);
    this.name = props.name;
    this.priceCents = new Price(props.priceCents);
    this.description = props.description;
    this.discount = props.discount;
    this.currencyCode = new CurrencyCode(props.currencyCode);
    this.photosLimit = new PositiveNumber(props.photosLimit);
    this.videosLimit = new PositiveNumber(props.videosLimit);
  }

  static create(props: CreateProps) {
    return new Plan({ id: new ID().getValue(), ...props });
  }

  static build(props: BuildProps) {
    return new Plan(props);
  }

  isFree(): boolean {
    return this.priceCents.getValue() === 0;
  }

  getId(): string {
    return this.id.getValue();
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getPriceCents(): number {
    return this.priceCents.getValue();
  }

  getCurrencyCode(): string {
    return this.currencyCode.getValue();
  }

  getPhotosLimit(): number {
    return this.photosLimit.getValue();
  }

  getVideosLimit(): number {
    return this.videosLimit.getValue();
  }

  getDiscount(): Discount | undefined {
    return this.discount;
  }

  calculateFinalPrice() {
    if (this.discount) {
      const discountValue =
        (this.priceCents.getValue() * this.discount.getPercentage()) / 100;
      return this.priceCents.getValue() - discountValue;
    }
    return this.priceCents.getValue();
  }
}
