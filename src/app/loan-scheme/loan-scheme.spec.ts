import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanScheme } from './loan-scheme';

describe('LoanScheme', () => {
  let component: LoanScheme;
  let fixture: ComponentFixture<LoanScheme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanScheme]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanScheme);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
