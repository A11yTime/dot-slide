import { Component } from '@angular/core';
import { CarouselComponent } from './components/carousel/carousel.component';
import { SlideShowComponent } from './components/slide-show/slide-show.component';
import { AccessibleCarouselComponent } from "./components/accessible-carousel/accessible-carousel.component"; // Adjust path as necessary

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CarouselComponent, AccessibleCarouselComponent, SlideShowComponent], // Import the CarouselComponent here
})
export class AppComponent {}
