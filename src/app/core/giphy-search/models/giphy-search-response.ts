import { Giphy } from './giphy';

export interface GiphySearchResponse {
  data: Giphy[];
  pagination: {
    count: number;
    offset: number;
    total_count: number;
  };
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
}
