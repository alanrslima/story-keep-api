import { EntityManager } from "typeorm";

export interface BaseRepository {
  setManager(manager: EntityManager): void;
}
