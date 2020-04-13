import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitPreviewComponent } from './benefit-preview.component';
import { ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';

describe('BenefitPreviewComponent', () => {
  let component: BenefitPreviewComponent;
  let fixture: ComponentFixture<BenefitPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [BenefitPreviewComponent]
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

  // todo figure these out
  it('should display benefit cost calculation', () => {
    const employeeFirstNameControl = component.benefitCostForm.get('employeeFirstName') as FormControl;
    employeeFirstNameControl.setValue('real value');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.benefit-cost').textContent).toContain('Benefits: ');
  });

  it('should display take home calculation', () => {
    const employeeFirstNameControl = component.benefitCostForm.get('employeeFirstName') as FormControl;
    employeeFirstNameControl.setValue('real value');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.take-home-pay').textContent).toContain('Take Home: ');
  });
});
