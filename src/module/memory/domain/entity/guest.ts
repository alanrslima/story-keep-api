import { ID } from "../../../common";

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
  userId: string;
  status: GuestStatus;
};

export type GuestCreateProps = {
  userId: string;
};

export class Guest {
  private userId: ID;
  private status: GuestStatus;

  private constructor(props: GuestConstructorProps) {
    this.userId = new ID(props.userId);
    this.status = props.status;
  }

  public static create(props: GuestCreateProps): Guest {
    return new Guest({
      userId: new ID(props.userId).getValue(),
      status: GuestStatus.Pending,
    });
  }

  public static build(props: GuestConstructorProps) {
    return new Guest(props);
  }

  public getUserId(): string {
    return this.userId.getValue();
  }

  public getStatus(): GuestStatus {
    return this.status;
  }
}
