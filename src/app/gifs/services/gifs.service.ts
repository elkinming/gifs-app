import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private api_key: string = 'p77J7tMHWQnlmTzZMGIZzKcgJGk9uLaK'
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'

  constructor(
    private http: HttpClient
  ) {
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string){
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => {
        return oldTag !== tag ;
      })
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.slice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(){
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(){
    if(localStorage.getItem('history')){
      this._tagsHistory = JSON.parse(localStorage.getItem('history') as string);
      if(this._tagsHistory.length > 0){
        this.searchTag(this._tagsHistory[0]);
      }
    }
  }

  searchTag(tagName: string){
    if (tagName.length === 0) return;
    this.organizeHistory(tagName);

    const params = new HttpParams()
      .set('api_key', this.api_key)
      .set('limit', 10)
      .set('q', tagName);

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((resp) => {
        this.gifList = resp.data;
        // console.log(this.gifList);
      })
  }

}
