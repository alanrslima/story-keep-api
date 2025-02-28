import { MediaRegistry } from "../../../domain/entity/media-registry";

export interface MediaRegistryRepository {
  getById(id: string): Promise<MediaRegistry>;
  create(mediaRegistry: MediaRegistry): Promise<void>;
  update(mediaRegistry: MediaRegistry): Promise<void>;
}
