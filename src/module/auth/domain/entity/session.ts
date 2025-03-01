import jwt from "jsonwebtoken";
import { env, ID } from "../../../common";
import { User } from "./user";
import { InvalidCredentialsError } from "../../error/invalid-credentials-error";

const EXPIRES_IN_SECONDS = 60 * 60 * 24; // 1 dia

type CreateProps = {
  token: string;
  expiresAt: Date;
  clientId: string;
};

type BuildProps = CreateProps & {
  id: string;
};

type CreateWithoutPasswordProps = {
  user: User;
};

type CreateWithPasswordProps = CreateWithoutPasswordProps & {
  rawPassword: string;
};

export class Session {
  private id: string;
  private token: string;
  private expiresAt: Date;
  private clientId: string;

  constructor(props: BuildProps) {
    this.id = props.id;
    this.token = props.token;
    this.expiresAt = props.expiresAt;
    this.clientId = props.clientId;
  }

  static build(props: BuildProps) {
    return new Session(props);
  }

  static createWithoutPassword(props: CreateWithoutPasswordProps) {
    return new Session({
      expiresAt: this.generateExpiresAt(),
      token: this.createToken({
        clientId: props.user.getId(),
      }),
      id: new ID().getValue(),
      clientId: props.user.getId(),
    });
  }

  static createWithPassword(props: CreateWithPasswordProps) {
    const isValid = props.user.getPassword()?.valid(props.rawPassword);
    if (!isValid) {
      throw new InvalidCredentialsError();
    }
    return new Session({
      expiresAt: this.generateExpiresAt(),
      token: this.createToken({
        clientId: props.user.getId(),
      }),
      id: new ID().getValue(),
      clientId: props.user.getId(),
    });
  }
  protected static generateExpiresAt() {
    return new Date(new Date().getTime() + EXPIRES_IN_SECONDS * 1000);
  }

  protected static createToken(data: { clientId: string }): string {
    const ciphertext = jwt.sign({}, env.JWT_SECRET, {
      subject: JSON.stringify(data),
      expiresIn: EXPIRES_IN_SECONDS,
    });
    return ciphertext;
  }

  getToken() {
    return this.token;
  }

  getId() {
    return this.id;
  }

  getExpiresAt() {
    return this.expiresAt;
  }

  getClientId() {
    return this.clientId;
  }
}
