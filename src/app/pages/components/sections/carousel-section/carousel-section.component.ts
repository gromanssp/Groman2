import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CarouselComponent } from '../../../../shared/components/carousel/carousel.component';

@Component({
  selector: 'app-carousel-section',
  templateUrl: './carousel-section.component.html',
  styleUrl: './carousel-section.component.css',
  imports: [CarouselComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselSectionComponent {
  images = signal([
    { src: 'https://picsum.photos/seed/groman1/800/400', alt: 'Mountain landscape' },
    { src: 'https://picsum.photos/seed/groman2/800/400', alt: 'Ocean sunset' },
    { src: 'https://picsum.photos/seed/groman3/800/400', alt: 'Forest path' },
    { src: 'https://picsum.photos/seed/groman4/800/400', alt: 'City skyline' },
    { src: 'https://picsum.photos/seed/groman5/800/400', alt: 'Desert dunes' },
  ]);
}
