export interface GalleryDTO {
  data: { id: string; name: string; mimetype: string; url: string }[];
  page: number;
  perPage: number;
  total: number;
}
