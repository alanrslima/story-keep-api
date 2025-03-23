import { MysqlDataSource } from "../../../../common";
import { MediaRegistryRepository } from "../../../application/contract/repository/media-registry-repository";
import { MediaRegistry } from "../../../domain/entity/media-registry";
import { MediaRegistryNotFoundError } from "../../../error/media-registry-not-found-error";

export class MediaRegistryMysqlRepository implements MediaRegistryRepository {
  private dataSource = MysqlDataSource.getInstance();

  async create(mediaRegistry: MediaRegistry): Promise<void> {
    const sql = `INSERT INTO media_registry (id, memory_id, persona_id, name, mimetype, url, size, status) VALUES (?,?,?,?,?,?,?,?)`;
    await this.dataSource.query(sql, [
      mediaRegistry.getId(),
      mediaRegistry.getMemoryId(),
      mediaRegistry.getPersonaId(),
      mediaRegistry.getFilename(),
      mediaRegistry.getMimetype(),
      mediaRegistry.getUrl(),
      mediaRegistry.getSize(),
      mediaRegistry.getStatus(),
    ]);
  }

  async getById(id: string): Promise<MediaRegistry> {
    const sql = `SELECT id, memory_id as memoryId, persona_id as personaId, name as filename, mimetype, url, size, status FROM media_registry WHERE id = ?`;
    const [response] = await this.dataSource.query(sql, [id]);
    if (!response) throw new MediaRegistryNotFoundError();
    return MediaRegistry.build(response);
  }

  async update(mediaRegistry: MediaRegistry): Promise<void> {
    const sql = `UPDATE media_registry SET memory_id = ?, persona_id = ?, name = ?, mimetype = ?, url = ?, size = ?, status = ? WHERE id = ?`;
    await this.dataSource.query(sql, [
      mediaRegistry.getMemoryId(),
      mediaRegistry.getPersonaId(),
      mediaRegistry.getFilename(),
      mediaRegistry.getMimetype(),
      mediaRegistry.getUrl(),
      mediaRegistry.getSize(),
      mediaRegistry.getStatus(),
      mediaRegistry.getId(),
    ]);
  }
}
