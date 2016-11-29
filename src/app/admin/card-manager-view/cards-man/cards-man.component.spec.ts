/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardsManComponent } from './cards-man.component';

describe('CardsManComponent', () => {
  let component: CardsManComponent;
  let fixture: ComponentFixture<CardsManComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsManComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
