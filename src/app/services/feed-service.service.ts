import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Feed} from '../models/feed';
import {environment} from '../../environments/environment';

@Injectable()
export class FeedService {
  constructor(
    private _httpClient: HttpClient
  ) {
  }

  private _rss2json = environment.rss2json;

  getFeedContent(url: string): Observable<Feed> {
    return this._httpClient.jsonp(this._rss2json + url, 'callback')
      .catch(this.handleError);
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
