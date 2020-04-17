import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { BenefitCostAssumptions } from 'src/app/models/benefit-cost-assumptions';
import { Observable, of } from 'rxjs';
import { BenefitCostService } from 'src/app/services/benefit-cost/benefit-cost.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  @Component({
    selector: 'app-benefit-preview',
    template: '<div>mock benefit-preview</div>>'
  })
  class MockBenefitPreviewComponent {}

  class MockBenefitCostService {
    getBenefitsCostAssumptions(): Observable<BenefitCostAssumptions> {
      return of({
        employeePaycheck: 2000,
        numPaychecks: 26
      } as BenefitCostAssumptions);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [HomeComponent, MockBenefitPreviewComponent],
      providers: [
        { provide: BenefitCostService, useClass: MockBenefitCostService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render instructions', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#instructions').textContent)
      .toBe('Enter the first names of each employee and their dependents.');
  });

  it('should render assumptions', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#assumptions').textContent)
      .toBe('This assumes all employees are paid $2,000.00 per paycheck before deductions and there are 26 paychecks per year. ' +
        'Note: this is a preview. ' +
        'Individual paychecks throughout the year may differ by a few pennies to account for uneven division per pay period.');
  });

  it('should render benefit-cost-preview component', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(MockBenefitPreviewComponent))).toBeTruthy();
  });
});
