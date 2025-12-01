import { GalleryRepository } from "./repository/gallery-repository";
import { MemoryOrderRepository } from "./repository/memory-order-repository";
import { MemoryRepository } from "./repository/memory-repository";

export interface MemoryRepositories {
  memoryRepository: MemoryRepository;
  memoryOrderRepository: MemoryOrderRepository;
  galleryRepository: GalleryRepository;
}
