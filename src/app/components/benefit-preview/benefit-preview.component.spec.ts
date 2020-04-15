import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitPreviewComponent } from './benefit-preview.component';
import { ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { BenefitCostService } from 'src/app/services/benefit-cost/benefit-cost.service';
import { PaycheckSummary } from 'src/app/models/paycheck-summary';

describe('BenefitPreviewComponent', () => {
  let component: BenefitPreviewComponent;
  let fixture: ComponentFixture<BenefitPreviewComponent>;

  class MockBenefitCostService {
    calculatePaycheckPreview(employeeName: string, dependentFirstNames: string[] = []): PaycheckSummary {
      return {
        benefitsCost: 0,
        takeHomePay: 0
      }
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [BenefitPreviewComponent],
      providers: [
        { provide: BenefitCostService, useClass: MockBenefitCostService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid if employee first name has no value', () => {
    const employeeFirstNameControl = component.benefitCostForm.get('employeeFirstName') as FormControl;
    employeeFirstNameControl.setValue('');
    expect(component.benefitCostForm.valid).toBe(false);
  });

  it('should be valid if employee first name has value', () => {
    const employeeFirstNameControl = component.benefitCostForm.get('employeeFirstName') as FormControl;
    employeeFirstNameControl.setValue('real value');
    expect(component.benefitCostForm.valid).toBe(true);
  });

  it('should be invalid if any dependent first name has no value', () => {
    const employeeFirstNameControl = component.benefitCostForm.get('employeeFirstName') as FormControl;
    const dependentControls = (component.benefitCostForm.get('dependentFirstNames') as FormArray).controls;

    employeeFirstNameControl.setValue('real value');
    component.addDependent();
    component.addDependent();
    dependentControls[0].setValue('real value');

    expect(component.benefitCostForm.valid).toBe(false);
  });

  it('should be valid if all dependent first names have a value', () => {
    const employeeFirstNameControl = component.benefitCostForm.get('employeeFirstName') as FormControl;
    const dependentControls = (component.benefitCostForm.get('dependentFirstNames') as FormArray).controls;

    employeeFirstNameControl.setValue('real value');
    component.addDependent();
    component.addDependent();
    dependentControls[0].setValue('real value');
    dependentControls[1].setValue('real value');

    expect(component.benefitCostForm.valid).toBe(true);
  });

  it('should add a new dependent when add is clicked', () => {
    component.addDependent();
    const dependentControls = (component.benefitCostForm.get('dependentFirstNames') as FormArray).controls;
    expect(dependentControls.length === 2);
  });

  it('should remove specified dependent when removed is clicked', () => {
    component.addDependent();
    component.addDependent();
    const dependentControls = (component.benefitCostForm.get('dependentFirstNames') as FormArray).controls;
    dependentControls[0].setValue('0');
    dependentControls[1].setValue('1');
    component.removeDependent(0);
    expect(dependentControls[0].value === '1');
  });

  it('should display error if invalid', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.invalid-form-message').textContent)
      .toBe('Enter names for employee and dependents to see preview');
  });

  it('should display benefit cost calculation', () => {
    const employeeFirstNameControl = component.benefitCostForm.get('employeeFirstName') as FormControl;
    employeeFirstNameControl.setValue('real value');
    component.paycheckSummary = {
      benefitsCost: 7.778,
      takeHomePay: 0
    };
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.benefit-cost').textContent).toContain('Benefits: $7.78');
  });

  it('should display take home calculation', () => {
    const employeeFirstNameControl = component.benefitCostForm.get('employeeFirstName') as FormControl;
    employeeFirstNameControl.setValue('real value');
    component.paycheckSummary = {
      benefitsCost: 0,
      takeHomePay: 7.778
    };
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.take-home-pay').textContent).toContain('Take Home: $7.78');
  });
});
