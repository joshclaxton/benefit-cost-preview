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

  destroyed$ = new Subject();
  paycheckSummary: PaycheckSummary;
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
          this.benefitCostService.calculatePaycheckPreviewAsync(form.employeeFirstName, form.dependentFirstNames)
            .subscribe(data => {
              this.paycheckSummary = data;
            });
        } else {
          this.paycheckSummary = null;
        }
      });
  }

  addDependent(): void {
    this.dependentFirstNames.push(this.formBuilder.control('', Validators.required));
  }

  removeDependent(index: number): void {
    this.dependentFirstNames.removeAt(index);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private get dependentFirstNames(): FormArray {
    return this.benefitCostForm.get('dependentFirstNames') as FormArray;
  }
}
