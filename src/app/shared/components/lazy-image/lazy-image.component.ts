import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.css']
})
export class LazyImageComponent implements OnInit {

  @Input()
  url!: string;

  @Input()
  alt: string = '';

  hasLoaded: boolean = false;

  constructor() { }

  ngOnInit() {
    if(!this.url) throw new Error ('URL property required');
  }

  imageLoaded(){
    this.hasLoaded = true;
  }

}
