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
  status: GuestStatus;
};

export type GuestCreateProps = {
  email: string;
};

export class Guest {
  private id: ID;
  private email: Email;
  private status: GuestStatus;

  private constructor(props: GuestConstructorProps) {
    this.id = new ID(props.id);
    this.email = new Email(props.email);
    this.status = props.status;
  }

  public static create(props: GuestCreateProps): Guest {
    return new Guest({
      email: props.email,
      id: new ID().getValue(),
      status: GuestStatus.Pending,
    });
  }

  public getId(): string {
    return this.id.getValue();
  }

  public getEmail(): string {
    return this.email.getValue();
  }

  public getStatus(): GuestStatus {
    return this.status;
  }
}
