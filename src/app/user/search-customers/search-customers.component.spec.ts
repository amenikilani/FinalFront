import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVolsComponent } from './search-customers.component';

describe('SearchCustomersComponent', () => {
  let component: SearchVolsComponent;
  let fixture: ComponentFixture<SearchVolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchVolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchVolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
