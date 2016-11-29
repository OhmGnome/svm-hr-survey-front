/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CriticalComponent } from './critical.component';

describe('CriticalComponent', () => {
  let component: CriticalComponent;
  let fixture: ComponentFixture<CriticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
