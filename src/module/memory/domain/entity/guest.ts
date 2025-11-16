import { ID } from "../../../common";
import { GuestStatus } from "../value-object/guest-status";

type GuestConstructorProps = {
  userId: string;
  status: string;
};

export type GuestCreateProps = {
  userId: string;
};

export class Guest {
  private userId: ID;
  private status: GuestStatus;

  private constructor(props: GuestConstructorProps) {
    this.userId = new ID(props.userId);
    this.status = new GuestStatus(props.status);
  }

  public static create(props: GuestCreateProps): Guest {
    return new Guest({
      userId: new ID(props.userId).getValue(),
      status: "ACCEPTED",
    });
  }

  public static build(props: GuestConstructorProps) {
    return new Guest(props);
  }

  public getUserId(): string {
    return this.userId.getValue();
  }

  public getStatus(): string {
    return this.status.getValue();
  }

  setStatus(status: string) {
    this.status = new GuestStatus(status);
  }
}
