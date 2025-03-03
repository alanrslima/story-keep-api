import { ID } from "../../../common";

type CreateProps = {
  name: string;
  percentage: number;
};

type BuildProps = CreateProps & {
  id: string;
};
export class Discount {
  private id: ID;
  private name: string;
  private percentage: number;

  private constructor(props: BuildProps) {
    this.id = new ID(props.id);
    this.name = props.name;
    this.percentage = props.percentage;
  }

  static create(props: CreateProps) {
    return new Discount({ ...props, id: new ID().getValue() });
  }

  static build(props: BuildProps) {
    return new Discount(props);
  }

  getId(): string {
    return this.id.getValue();
  }

  getName(): string {
    return this.name;
  }

  getPercentage(): number {
    return this.percentage;
  }
}
