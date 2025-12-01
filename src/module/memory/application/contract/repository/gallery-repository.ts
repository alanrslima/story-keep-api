import { EntityId, PositiveNumber } from "../../../../common";
import { BaseRepository } from "../../../../common/application/contract/base-repository";
import { GalleryDTO } from "../dto/gallery-dto";

export interface GalleryRepository extends BaseRepository {
  paginateByMemoryId(
    memoryId: EntityId,
    page: PositiveNumber,
    perPage: PositiveNumber
  ): Promise<GalleryDTO>;
}
