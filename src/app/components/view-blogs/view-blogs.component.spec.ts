import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBlogsComponent } from './view-blogs.component';
import { DateFormatPipe } from 'src/app/pipes/date-pipe/date-format.pipe';

describe('ViewBlogsComponent', () => {
  let component: ViewBlogsComponent;
  let fixture: ComponentFixture<ViewBlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBlogsComponent,DateFormatPipe ],
    })
    .compileComponents();
    fixture = TestBed.createComponent(ViewBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should have getBlogs function', () => {
    const spy = spyOn(component.selectedTab, 'emit').and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  } );
});
