import {Component, OnInit} from '@angular/core';
import {CarouselConfig} from 'angular-bootstrap-md/carousel/carousel.config';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [CarouselConfig]
})
export class HomeComponent implements OnInit {

  constructor(config: CarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.keyboard = false;
  }

  ngOnInit() {
  }

}
