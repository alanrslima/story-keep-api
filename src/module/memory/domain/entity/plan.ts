import { ID } from "../../../common";
import { Discount } from "./discount";

type CreateProps = {
  name: string;
  description: string;
  price: number;
  currency: string;
  photosLimit?: number;
  videosLimit?: number;
};

type BuildProps = CreateProps & {
  id: string;
  discount?: Discount;
};

export class Plan {
  private id: ID;
  private name: string;
  private description: string;
  private currency: string;
  private price: number;
  private discount?: Discount;
  private photosLimit?: number;
  private videosLimit?: number;

  private constructor(props: BuildProps) {
    this.id = new ID(props.id);
    this.name = props.name;
    this.price = props.price;
    this.description = props.description;
    this.discount = props.discount;
    this.currency = props.currency;
    this.photosLimit = props.photosLimit;
    this.videosLimit = props.videosLimit;
  }

  static create(props: CreateProps) {
    return new Plan({ id: new ID().getValue(), ...props });
  }

  static build(props: BuildProps) {
    return new Plan(props);
  }

  isFree(): boolean {
    return this.price === 0;
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

  getPrice(): number {
    return this.price;
  }

  getCurrency(): string {
    return this.currency;
  }

  getPhotosLimit(): number | undefined {
    return this.photosLimit;
  }

  getVideosLimit(): number | undefined {
    return this.videosLimit;
  }

  getDiscount(): Discount | undefined {
    return this.discount;
  }
}
