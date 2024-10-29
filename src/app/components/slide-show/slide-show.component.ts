import { Component, OnInit, OnDestroy, QueryList, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slide-show',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css']
})
export class SlideShowComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('slide') slides!: QueryList<ElementRef<HTMLDivElement>>;
  dots: HTMLElement[] = [];
  
  images = [
    { src: 'Images/image1.jpg', alt: 'Description of Image 1' },
    { src: 'Images/image2.jpg', alt: 'Description of Image 2' },
    { src: 'Images/image3.jpg', alt: 'Description of Image 3' },
    { src: 'Images/image4.jpg', alt: 'Description of Image 4' },
    { src: 'Images/image5.jpg', alt: 'Description of Image 5' },
  ];

  slideIndex = 0;
  intervalId: any;
  isPlaying = true; // Property to track play/pause state
  ariaLive = 'off'; // Initial aria-live state 
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dots = Array.from(document.getElementsByClassName("dot")) as HTMLElement[]; // Initialize dots here
    this.showSlides(); // Call showSlides after the view is initialized
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId); // Clear the interval when the component is destroyed
  }

  showSlides(): void {
    if (this.slides.length > 0) {
      this.slides.forEach((slide) => (slide.nativeElement.style.display = 'none')); // Hide all slides
      this.slideIndex++;

      if (this.slideIndex > this.images.length) {
        this.slideIndex = 1;
      }

      if (this.dots.length > 0) {
        this.dots.forEach(dot => dot.className = dot.className.replace(" active", "")); // Remove active class
        this.slides.toArray()[this.slideIndex - 1].nativeElement.style.display = 'block'; // Show current slide
        this.dots[this.slideIndex - 1].className += " active"; // Set current dot as active
      }

      // Change image every 2 seconds if playing
      if (this.isPlaying) {
        this.ariaLive = 'off'; // Set aria-live to off during auto-rotation
        this.intervalId = setTimeout(() => this.showSlides(), 2000);
      }
    }
  }

  currentSlide(n: number): void {
    clearTimeout(this.intervalId); // Clear the timeout to avoid overlapping calls
    this.slideIndex = n; // Set the slide index to the clicked dot
    this.showSlides(); // Show the selected slide
    this.ariaLive = 'polite'; // Set aria-live to polite for manual navigation
  }

  togglePlayPause(): void {
    this.isPlaying = !this.isPlaying; // Toggle the play/pause state
    if (this.isPlaying) {
      this.showSlides(); // Resume the slideshow
      this.ariaLive = 'off'; // Ensure aria-live is off when playing
    } else {
      clearTimeout(this.intervalId); // Pause the slideshow
      this.ariaLive = 'off'; // Ensure aria-live is off when paused
    }
  }

  onDotKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Enter' || event.key === ' ') { // Handle Enter and Space keys
      this.currentSlide(index); // Navigate to the corresponding slide
      event.preventDefault(); // Prevent default action
    }
  }
}
