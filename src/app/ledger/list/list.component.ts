import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { WavesModule, TableModule, InputsModule, MdbTableDirective } from 'angular-bootstrap-md';
import * as $ from 'jquery';

declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  elements: any = [];
  headElements = ['Contents', 'Type', 'Details', 'Receipt', 'Amount', 'Balance', 'Date', 'Reply'];

  searchText: string = '';
  previous: string;

  constructor() { }

  @HostListener('input') oninput() {
    this.searchItems();
  }

  ngOnInit() {
    for (let i = 1; i <= 10; i++) {
      this.elements.push({ id: i.toString(), first: 'Wpis ' + i, last: 'Last ' + i, handle: 'Handle ' + i });
    }

    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }
}
