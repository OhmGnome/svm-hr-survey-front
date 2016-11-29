/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TopCritComponent } from './top-crit.component';

describe('TopCritComponent', () => {
  let component: TopCritComponent;
  let fixture: ComponentFixture<TopCritComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopCritComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopCritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
