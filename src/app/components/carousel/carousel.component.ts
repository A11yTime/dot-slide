import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class CarouselComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  autoRotateInterval: any;
  isPaused = false;

  items = [
    { src: 'assets/image1.jpg', alt: 'Description of Image 1' },
    { src: 'assets/image2.jpg', alt: 'Description of Image 2' },
    { src: 'assets/image3.jpg', alt: 'Description of Image 3' },
    { src: 'assets/image4.jpg', alt: 'Description of Image 4' },
    { src: 'assets/image5.jpg', alt: 'Description of Image 5' },
    { src: 'assets/image6.jpg', alt: 'Description of Image 6' },
  ];

  ngOnInit(): void {
    this.startAutoRotate();
  }

  ngOnDestroy(): void {
    this.stopAutoRotate();
  }

  moveSlide(direction: number): void {
    if (direction === 1) {
      // Moving forward
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
    } else {
      // Moving backward
      this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    }
  }

  isActive(index: number): boolean {
    return index === this.currentIndex;
  }

  startAutoRotate(): void {
    this.autoRotateInterval = setInterval(() => {
      if (!this.isPaused) {
        this.moveSlide(1); // Move to the next slide
      }
    }, 3000); // Change slide every 3 seconds
  }

  stopAutoRotate(): void {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
    }
  }

  togglePause(): void {
    this.isPaused = !this.isPaused;
  }
}
