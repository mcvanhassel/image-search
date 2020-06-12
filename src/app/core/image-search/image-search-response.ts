import { Image } from './image';

export interface ImageSearchResponse {
  images: Image[];
  pagination: {
    count: number;
    offset: number;
    total: number;
  };
}
