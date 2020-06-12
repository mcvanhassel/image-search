import { GiphySource } from './giphy-source';

export interface Giphy {
  id: string;
  title: string;
  source: string;
  import_datetime: string;
  images: {
    original: GiphySource;
    fixed_height_small: GiphySource;
    fixed_height: GiphySource;
  };
}
