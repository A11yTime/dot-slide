import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accessible-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accessible-carousel.component.html',
  styleUrl: './accessible-carousel.component.css'
})
export class AccessibleCarouselComponent implements OnInit, OnDestroy {
  images = [
    { src: 'assets/image1.jpg', alt: 'Description of Image 1' },
    { src: 'assets/image2.jpg', alt: 'Description of Image 2' },
    { src: 'assets/image3.jpg', alt: 'Description of Image 3' }
  ];

  currentIndex = 1; // Start at the first actual slide
  displayedImages: any[] = [];
  autoRotateInterval: any;
  isAutoRotating = true; // Track auto-rotation state

  ngOnInit() {
    this.setupCarousel();
    this.startAutoRotation();
  }

  ngOnDestroy() {
    this.stopAutoRotation();
  }

  setupCarousel() {
    // Duplicate first and last images for circular effect
    this.displayedImages = [
      this.images[this.images.length - 1], // Last image
      ...this.images,
      this.images[0] // First image
    ];
  }

  startAutoRotation() {
    this.autoRotateInterval = setInterval(() => {
      this.next();
    }, 3000); // Change image every 3 seconds
  }

  stopAutoRotation() {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
    }
  }

  toggleAutoRotation() {
    this.isAutoRotating = !this.isAutoRotating;
    if (this.isAutoRotating) {
      this.startAutoRotation();
    } else {
      this.stopAutoRotation();
    }
  }

  get transform() {
    return `translateX(-${this.currentIndex * (100 / this.displayedImages.length)}%)`;
  }

  next() {
    this.currentIndex++;
    if (this.currentIndex >= this.displayedImages.length - 1) {
      this.currentIndex = 1; // Reset to the first actual slide
    }
  }

  prev() {
    this.currentIndex--;
    if (this.currentIndex <= 0) {
      this.currentIndex = this.displayedImages.length - 2; // Go to the last actual slide
    }
  }
}
