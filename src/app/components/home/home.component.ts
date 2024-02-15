import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('slideTrack', { static: false }) slideTrack: ElementRef | undefined;

  ngAfterViewInit() {
    timer(0, 3000).subscribe(() => this.rotateCarousel());
  }

  rotateCarousel() {
    if (this.slideTrack) {
      const track = this.slideTrack.nativeElement;
      const firstSlide = track.children[0];
      const width = firstSlide.offsetWidth;

      track.style.transition = 'margin-left 1s';
      track.style.marginLeft = -width + 'px';

      setTimeout(() => {
        track.style.transition = '';
        track.style.marginLeft = '0px';
        track.appendChild(firstSlide);
      }, 1000);
    }
  }

}
