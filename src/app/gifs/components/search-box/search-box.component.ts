import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input
      #searchInput
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
    >
  `,
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  @ViewChild('searchInput')
  tagValue!: ElementRef<HTMLInputElement>;

  constructor(
    private gifsService: GifsService
  ) { }

  searchTag(){
    const value = this.tagValue?.nativeElement.value;
    this.gifsService.searchTag(value);
    console.log(this.gifsService.tagsHistory);
    this.tagValue.nativeElement.value = ''
  }

}
