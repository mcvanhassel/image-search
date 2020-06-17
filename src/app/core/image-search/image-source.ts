import { SafeUrl } from '@angular/platform-browser';

export interface ImageSource {
  url?: SafeUrl;
  mp4?: SafeUrl;
  webp?: SafeUrl;
  height: number;
  width: number;
}
