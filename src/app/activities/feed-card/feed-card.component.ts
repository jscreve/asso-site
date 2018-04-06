import {Component, Input, OnInit} from '@angular/core';
import {FeedEntry} from './model/feed-entry';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss']
})
export class FeedCardComponent implements OnInit {

  @Input() feedEntry: FeedEntry;

  constructor() {
  }

  ngOnInit() {
  }

}
