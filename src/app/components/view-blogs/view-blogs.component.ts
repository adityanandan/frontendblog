import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'view-blogs',
  templateUrl: './view-blogs.component.html',
  styleUrls: ['./view-blogs.component.css']
})
export class ViewBlogsComponent implements OnInit {
  @Input()
  blogs: any;
  @Output()
  selectedTab: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.selectedTab.emit();
  }

}
