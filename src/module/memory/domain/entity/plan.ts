import { ID, Price } from "../../../common";
import { CurrencyCode } from "../value-object/currency-code";
import { NaturalNumber } from "../value-object/natural-number";
import { PositiveNumber } from "../value-object/positive-number";
import { Discount } from "./discount";

type CreateProps = {
  name: string;
  description: string;
  priceCents: number;
  currencyCode: string;
  photosLimit: number;
  videosLimit: number;
  position: number;
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
  private photosLimit: NaturalNumber;
  private videosLimit: NaturalNumber;
  private position: PositiveNumber;

  private constructor(props: BuildProps) {
    this.id = new ID(props.id);
    this.name = props.name;
    this.priceCents = new Price(props.priceCents);
    this.description = props.description;
    this.discount = props.discount;
    this.currencyCode = new CurrencyCode(props.currencyCode);
    this.photosLimit = new NaturalNumber(props.photosLimit);
    this.videosLimit = new NaturalNumber(props.videosLimit);
    this.position = new PositiveNumber(props.position);
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

  getPosition(): number {
    return this.position.getValue();
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

  getDiscountValue(): number {
    if (!this.discount) return 0;
    return (this.priceCents.getValue() * this.discount.getPercentage()) / 100;
  }

  calculateFinalPrice() {
    const discountValue = this.getDiscountValue();
    return this.priceCents.getValue() - discountValue;
  }
}
