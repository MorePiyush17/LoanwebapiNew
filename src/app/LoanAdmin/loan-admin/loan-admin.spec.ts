import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAdmin } from './loan-admin';

describe('LoanAdmin', () => {
  let component: LoanAdmin;
  let fixture: ComponentFixture<LoanAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
