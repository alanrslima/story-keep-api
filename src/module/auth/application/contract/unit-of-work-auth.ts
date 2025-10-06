import { UnitOfWork } from "../../../common";
import { AuthRepositories } from "./dto/auth-repositories";

export interface UnitOfWorkAuth extends UnitOfWork<AuthRepositories> {}
