import { Injectable } from '@angular/core';
import { PaycheckSummary } from 'src/app/models/paycheck-summary';


@Injectable({
  providedIn: 'root'
})
export class BenefitCostService {

  private readonly employeeYearlyBenefitCost = 1000;
  private readonly dependendentYearlyBenefitCost = 500;
  readonly numPaychecks = 26;
  readonly employeePaycheck = 2000;

  constructor() { }

  calculatePaycheckPreview(employeeName: string, dependentFirstNames: string[] = []): PaycheckSummary {
    if (!employeeName || (dependentFirstNames && dependentFirstNames.some(d => !d))) {
      throw Error('All names must have a value');
    }

    let yearlyBenefitCost = this.calculateEmployeeYearlyCost(employeeName);
    if (dependentFirstNames) {
      yearlyBenefitCost += dependentFirstNames
        .map(d => this.calculateDependentYearlyCost(d))
        .reduce((a, b) => a + b, 0);
    }

    const benefitsCost = yearlyBenefitCost / this.numPaychecks;

    return {
      benefitsCost,
      takeHomePay: this.employeePaycheck - benefitsCost
    };
  }

  private calculateEmployeeYearlyCost(name: string): number {
    const discountFactor = this.getDiscountFactor(name);
    return this.calculateCost(this.employeeYearlyBenefitCost, discountFactor);
  }

  private calculateDependentYearlyCost(name: string): number {
    const discountFactor = this.getDiscountFactor(name);
    return this.calculateCost(this.dependendentYearlyBenefitCost, discountFactor);
  }

  private calculateCost(baseCost: number, discountFactor: number) {
    return baseCost * discountFactor;
  }

  private getDiscountFactor(name: string): number {
    switch (name[0]) {
      case 'A':
      case 'a':
        return 0.9;
      default:
        return 1;
    }
  }
}

