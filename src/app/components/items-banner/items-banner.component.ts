import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';

@Component({
  selector: 'items-banner',
  templateUrl: './items-banner.component.html',
  styleUrls: ['./items-banner.component.scss'],
})
export class ItemsBannerComponent {
  @Input() items: Movie[] = [];
  @Input() title: string = '';
  name: string = 'Tv Shows';

  // constructor() {} -> Not Needed

  // ngOnInit(): void {} -> Not Needed, removed implementation of OnInit
}
