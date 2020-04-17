import { Injectable } from '@angular/core';
import { PaycheckSummary } from 'src/app/models/paycheck-summary';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalculateBenefitCostPreviewInputModel } from 'src/app/models/calculate-benefit-cost-preview-input-model';
import { BenefitCostAssumptions } from 'src/app/models/benefit-cost-assumptions';


@Injectable({
  providedIn: 'root'
})
export class BenefitCostService {

  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getBenefitsCostAssumptions(): Observable<BenefitCostAssumptions> {
    return this.httpClient.get<BenefitCostAssumptions>('/api/BenefitCost/GetBenefitsCostAssumptions');
  }

  calculatePaycheckPreviewAsync(employeeFirstName: string, dependentFirstNames: string[] = []): Observable<PaycheckSummary> {
    const data = {
      employeeFirstName,
      dependentFirstNames

    } as CalculateBenefitCostPreviewInputModel;
    return this.httpClient.post<PaycheckSummary>('/api/BenefitCost/CalculateBenefitCostPreview', data, this.httpOptions);
  }
}

