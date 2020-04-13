import { Component, OnInit, OnDestroy } from '@angular/core';
import { BenefitCostService } from 'src/app/services/benefit-cost/benefit-cost.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { PaycheckSummary } from 'src/app/models/paycheck-summary';
import { Subject } from 'rxjs';
import { takeUntil, debounce, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-benefit-preview',
  templateUrl: './benefit-preview.component.html',
  styleUrls: ['./benefit-preview.component.scss']
})
export class BenefitPreviewComponent implements OnInit, OnDestroy {

  paycheckSummary: PaycheckSummary;
  destroyed$ = new Subject();
  benefitCostForm = this.formBuilder.group({
    employeeFirstName: ['', Validators.required],
    dependentFirstNames: this.formBuilder.array([])
  });
  constructor(
    private benefitCostService: BenefitCostService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.benefitCostForm.valueChanges
      .pipe(takeUntil(this.destroyed$), debounceTime(300))
      .subscribe(form => {
        if (this.benefitCostForm.valid) {
          this.paycheckSummary = this.benefitCostService.calculatePaycheckPreview(form.employeeFirstName, form.dependentFirstNames);
        } else {
          this.paycheckSummary = null;
        }
      });
  }

  private get dependentFirstNames() {
    return this.benefitCostForm.get('dependentFirstNames') as FormArray;
  }

  addDependent() {
    this.dependentFirstNames.push(this.formBuilder.control('', Validators.required));
  }

  removeDependent(index: number) {
    this.dependentFirstNames.removeAt(index);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
