import { Email, ID, Name } from "../../../common";
import { availableRoles } from "../contract/available-roles";
import { Password } from "../value-object/password";
import { Role } from "./role";

type UserStatusTypes = "waiting_approvement" | "approved" | "denied";

type CreateProps = {
  name: string;
  email: string;
  rawPassword?: string;
  profileUrl?: string;
  role: keyof typeof availableRoles;
};

type BuildProps = Omit<CreateProps, "rawPassword"> & {
  id: string;
  password?: string;
  salt?: string;
  status: UserStatusTypes;
  isFirstLogin: boolean;
};

type ConstructorProps = Omit<BuildProps, "password" | "salt"> & {
  password?: Password;
};

export class User {
  private id: ID;
  private name: Name;
  private email: Email;
  private password?: Password;
  private profileUrl?: string;
  private status: UserStatusTypes;
  private isFirstLogin: boolean;
  private role: Role;

  private constructor(props: ConstructorProps) {
    this.id = new ID(props.id);
    this.name = new Name(props.name);
    this.email = new Email(props.email);
    this.password = props.password;
    this.isFirstLogin = props.isFirstLogin;
    this.role = new Role({ name: props.role as keyof typeof availableRoles });
    this.status = props.status;
    this.profileUrl = props.profileUrl;
  }

  static create(props: CreateProps) {
    return new User({
      ...props,
      id: new ID().getValue(),
      status: "waiting_approvement",
      isFirstLogin: true,
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

  getIsFirstLogin(): boolean {
    return this.isFirstLogin;
  }

  setIsFirstLogin(isFirstLogin: boolean) {
    this.isFirstLogin = isFirstLogin;
  }

  setEmail(email: string) {
    this.email = new Email(email);
  }

  getPassword(): Password | undefined {
    return this.password;
  }

  getProfileUrl(): string | undefined {
    return this.profileUrl;
  }

  setProfileUrl(profileUrl: string) {
    this.profileUrl = profileUrl;
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
