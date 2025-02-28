import { ID } from "../value-object/id";
import { Plan } from "./plan";

type CreateProps = {
  name: string;
  date: Date;
  plan: Plan;
  userId: string;
};

type BuildProps = CreateProps & {
  id: ID;
  status: MemoryStatus;
};
type MemoryStatus = "awaiting_payment";

export class Memory {
  private id: ID;
  private name: string;
  private date: Date;
  private plan: Plan;
  private userId: string;
  private status: MemoryStatus;

  private constructor(props: BuildProps) {
    this.id = props.id;
    this.name = props.name;
    this.plan = props.plan;
    this.date = props.date;
    this.userId = props.userId;
    this.status = props.status;
  }

  static create(props: CreateProps) {
    return new Memory({ id: new ID(), status: "awaiting_payment", ...props });
  }

  static build(props: BuildProps) {
    return new Memory(props);
  }

  getId(): string {
    return this.id.getValue();
  }

  getName(): string {
    return this.name;
  }

  getDate(): Date {
    return this.date;
  }

  getPlan(): Plan {
    return this.plan;
  }

  getUserId(): string {
    return this.userId;
  }
}
