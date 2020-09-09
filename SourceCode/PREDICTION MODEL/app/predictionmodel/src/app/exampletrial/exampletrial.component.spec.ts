import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampletrialComponent } from './exampletrial.component';

describe('ExampletrialComponent', () => {
  let component: ExampletrialComponent;
  let fixture: ComponentFixture<ExampletrialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampletrialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampletrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
