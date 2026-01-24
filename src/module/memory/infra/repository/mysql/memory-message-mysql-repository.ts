import { EntityManager } from "typeorm";
import { MemoryMessageRepository } from "../../../application/contract/repository/memory-message-repository";
import { MemoryMessage } from "../../../domain/entity/memory-message";
import { MemoryMessageMapper } from "./mapper/memory-message-mapper";

export class MemoryMessageMysqlRepository implements MemoryMessageRepository {
  private manager: EntityManager;

  constructor(manager: EntityManager) {
    this.manager = manager;
  }

  setManager(manager: EntityManager): void {
    this.manager = manager;
  }

  async create(memoryMessage: MemoryMessage): Promise<void> {
    const sql = `INSERT INTO memory_message 
    (id, memory_id, user_id, message) 
    VALUES (?,?,?,?)`;
    const data = MemoryMessageMapper.toPersistence(memoryMessage);
    await this.manager.query(sql, [
      data.id,
      data.memory_id,
      data.user_id,
      data.message,
    ]);
  }
}
