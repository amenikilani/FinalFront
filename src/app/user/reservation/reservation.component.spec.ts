/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VolComponent } from '../../admin/vol/vol.component';

describe('VolComponent', () => {
  let component: VolComponent;
  let fixture: ComponentFixture<VolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
