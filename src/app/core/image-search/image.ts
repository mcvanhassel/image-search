import { ImageSource } from './image-source';

export interface Image {
  id: string;
  title: string;
  source?: string;
  created?: Date;
  images: {
    original: ImageSource;
    small: ImageSource;
    medium: ImageSource;
  };
}
