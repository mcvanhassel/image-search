import { SafeUrl } from '@angular/platform-browser';

export interface ImageSource {
  url: SafeUrl | undefined;
  mp4: SafeUrl | undefined;
  webp: SafeUrl | undefined;
  height: number;
  width: number;
}
