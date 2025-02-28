import { Discount } from "./discount";
import { ID } from "../value-object/id";

type CreateProps = {
  name: string;
  description: string;
  value: number;
};

type BuildProps = CreateProps & {
  id: ID;
  discount?: Discount;
};

export class Plan {
  private id: ID;
  private name: string;
  private description: string;
  private value: number;
  private discount?: Discount;

  private constructor(props: BuildProps) {
    this.id = props.id;
    this.name = props.name;
    this.value = props.value;
    this.description = props.description;
    this.discount = props.discount;
  }

  static create(props: CreateProps) {
    return new Plan({ id: new ID(), ...props });
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  getValeu() {
    return this.value;
  }

  getDiscount() {
    return this.discount;
  }
}
