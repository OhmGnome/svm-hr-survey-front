/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StrongComponent } from './strong.component';

describe('StrongComponent', () => {
  let component: StrongComponent;
  let fixture: ComponentFixture<StrongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
