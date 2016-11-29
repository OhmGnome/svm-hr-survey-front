/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserManagerViewComponent } from './user-manager-view.component';

describe('UserManagerViewComponent', () => {
  let component: UserManagerViewComponent;
  let fixture: ComponentFixture<UserManagerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManagerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
