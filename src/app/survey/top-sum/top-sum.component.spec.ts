/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TopSumComponent } from './top-sum.component';

describe('TopSumComponent', () => {
  let component: TopSumComponent;
  let fixture: ComponentFixture<TopSumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopSumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
