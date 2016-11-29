/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UsersManComponent } from './users-man.component';

describe('UsersManComponent', () => {
  let component: UsersManComponent;
  let fixture: ComponentFixture<UsersManComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersManComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
