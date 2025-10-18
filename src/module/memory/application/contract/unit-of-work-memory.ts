import { UnitOfWork } from "../../../common";
import { MemoryRepositories } from "./memory-repositories";

export interface UnitOfWorkMemory extends UnitOfWork<MemoryRepositories> {}
