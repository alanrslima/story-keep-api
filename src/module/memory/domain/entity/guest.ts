import { Email, ID } from "../../../common";

export enum GuestStatus {
  Pending = "pending",
  Accepted = "accepted",
  Declined = "declined",
  Expired = "expired",
  Canceled = "canceled",
  Failed = "failed",
  Blocked = "blocked",
}

type GuestConstructorProps = {
  id: string;
  email: string;
  name?: string;
  status: GuestStatus;
};

export type GuestCreateProps = {
  email: string;
};

export class Guest {
  private id: ID;
  private email: Email;
  private status: GuestStatus;
  private name?: string;

  private constructor(props: GuestConstructorProps) {
    this.id = new ID(props.id);
    this.email = new Email(props.email);
    this.status = props.status;
    this.name = props.name;
  }

  public static create(props: GuestCreateProps): Guest {
    return new Guest({
      ...props,
      id: new ID().getValue(),
      status: GuestStatus.Pending,
    });
  }

  public static build(props: GuestConstructorProps) {
    return new Guest(props);
  }

  public getId(): string {
    return this.id.getValue();
  }

  getName(): string | undefined {
    return this.name;
  }

  public getEmail(): string {
    return this.email.getValue();
  }

  public getStatus(): GuestStatus {
    return this.status;
  }
}
