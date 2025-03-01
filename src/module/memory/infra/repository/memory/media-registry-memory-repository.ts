import { MediaRegistryRepository } from "../../../application/contract/repository/media-registry-repository";
import { MediaRegistry } from "../../../domain/entity/media-registry";

export class MediaRegistryMemoryRepository implements MediaRegistryRepository {
  private data: MediaRegistry[];

  constructor(data?: MediaRegistry[]) {
    this.data = data || [];
  }

  async create(mediaRegistry: MediaRegistry): Promise<void> {
    this.data.push(mediaRegistry);
  }

  async getById(id: string): Promise<MediaRegistry> {
    const item = this.data.find((i) => i.getId() === id);
    if (!item) throw new Error("Plan not founded");
    return item;
  }

  async update(mediaRegistry: MediaRegistry): Promise<void> {
    this.data = this.data.map((item) =>
      item.getId() === mediaRegistry.getId() ? mediaRegistry : item
    );
  }
}
