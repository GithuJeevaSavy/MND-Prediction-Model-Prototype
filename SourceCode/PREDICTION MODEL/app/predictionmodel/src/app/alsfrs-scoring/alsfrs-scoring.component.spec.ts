import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlsfrsScoringComponent } from './alsfrs-scoring.component';

describe('AlsfrsScoringComponent', () => {
  let component: AlsfrsScoringComponent;
  let fixture: ComponentFixture<AlsfrsScoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlsfrsScoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlsfrsScoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
