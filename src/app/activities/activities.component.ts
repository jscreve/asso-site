import {Component, OnInit} from '@angular/core';
import {FeedService} from '../services/feed-service.service';
import {environment} from '../../environments/environment';
import {FeedEntry} from '../models/feed-entry';
import {Feed} from '../models/feed';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  private _feedUrl = environment.newsFeedUrl;
  private _feeds: [FeedEntry];

  constructor(private _feedService: FeedService) {
  }

  ngOnInit() {
    this.refreshFeed();
  }

  private refreshFeed() {
    this._feedService.getFeedContent(this._feedUrl)
      .subscribe(
        (feed: Feed) => {
          this._feeds = feed.items;
        },
        error => console.log(error));
  }


  get feeds(): [FeedEntry] {
    return this._feeds;
  }
}
