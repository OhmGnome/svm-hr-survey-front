/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SessionManagerViewComponent } from './session-manager-view.component';

describe('SessionManagerViewComponent', () => {
  let component: SessionManagerViewComponent;
  let fixture: ComponentFixture<SessionManagerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionManagerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionManagerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
