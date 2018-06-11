import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.css']
})
export class TablePageComponent implements OnInit {

  @Input() user;

  constructor() { }

  ngOnInit() { }

}
