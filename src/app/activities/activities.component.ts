import {Component, OnInit} from '@angular/core';
import {FeedService} from './feed-service.service';
import {environment} from '../../environments/environment';
import {FeedEntry} from './feed-card/model/feed-entry';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  private _feedUrl = environment.newsFeedUrl;
  private _feeds: FeedEntry[] = [];

  constructor(private _feedService: FeedService) {
  }

  ngOnInit() {
    this.refreshFeed();
  }

  private refreshFeed() {
    this._feedService.getFeedContent(this._feedUrl)
      .subscribe(
        (feed: any) => {
          feed.posts.forEach((post) => {
            const feedEntry = new FeedEntry();
            feedEntry.title = post.title;
            feedEntry.description = post.excerpt;
            feedEntry.author = post.author.name;
            feedEntry.date = post.date;
            for (const attachment of Object.values(post.attachments)) {
              feedEntry.img.push(attachment.URL);
            }

            // parse youtube videos
            const domparser = new DOMParser();
            const domdoc = domparser.parseFromString(post.content, 'text/html');
            const videoAttachments = domdoc.getElementsByClassName('youtube-player');
            for (let vidIndex = 0; vidIndex < videoAttachments.length; vidIndex++) {
              feedEntry.vids.push(videoAttachments.item(vidIndex).outerHTML);
            }
            this._feeds.push(feedEntry);
          });
        },
        error => console.log(error));
  }


  get feeds(): FeedEntry[] {
    return this._feeds;
  }
}
