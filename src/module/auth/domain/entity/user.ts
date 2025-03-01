import { ID } from "../../../common";
import { availableRoles } from "../contract/available-roles";
import { Email } from "../value-object/email";
import { Name } from "../value-object/name";
import { Password } from "../value-object/password";
import { Role } from "./role";

type UserStatusTypes = "waiting_approvement" | "approved" | "denied";

type CreateProps = {
  name: string;
  email: string;
  rawPassword?: string;
  role: string;
};

type BuildProps = Omit<CreateProps, "rawPassword"> & {
  id: string;
  password?: string;
  salt?: string;
  status: UserStatusTypes;
};

type ConstructorProps = Omit<BuildProps, "password" | "salt"> & {
  password?: Password;
};

export class User {
  private id: ID;
  private name: Name;
  private email: Email;
  private password?: Password;
  private status: UserStatusTypes;
  private role: Role;

  private constructor(props: ConstructorProps) {
    this.id = new ID(props.id);
    this.name = new Name(props.name);
    this.email = new Email(props.email);
    this.password = props.password;
    this.role = new Role({ name: props.role as keyof typeof availableRoles });
    this.status = props.status;
  }

  static create(props: CreateProps) {
    return new User({
      ...props,
      id: new ID().getValue(),
      status: "waiting_approvement",
      password: props.rawPassword
        ? Password.create({ rawPassword: props.rawPassword })
        : undefined,
    });
  }

  static build(props: BuildProps) {
    return new User({
      ...props,
      password:
        props.password && props.salt
          ? Password.build({ hash: props.password, salt: props.salt })
          : undefined,
    });
  }

  getName(): string {
    return this.name.getValue();
  }

  setName(name: string) {
    this.name = new Name(name);
  }

  getId(): string {
    return this.id.getValue();
  }

  getEmail(): string {
    return this.email.getValue();
  }

  setEmail(email: string) {
    this.email = new Email(email);
  }

  getPassword(): Password | undefined {
    return this.password;
  }

  getRole(): string {
    return this.role.getName();
  }

  getStatus() {
    return this.status;
  }

  getPermissions(): string[] {
    return this.role.getPermissions();
  }

  setRole(role: string) {
    this.role = new Role({ name: role as keyof typeof availableRoles });
  }

  approve() {
    this.status = "approved";
  }

  deny() {
    this.status = "denied";
  }
}
