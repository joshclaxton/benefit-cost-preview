import { Component, OnInit } from '@angular/core';
import { BenefitCostService } from 'src/app/services/benefit-cost/benefit-cost.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  numPaychecks: number;
  employeePaycheck: number;
  constructor(private benefitCostService: BenefitCostService) { }

  ngOnInit() {
    this.benefitCostService.getBenefitsCostAssumptions().subscribe(data => {
      this.employeePaycheck = data.employeePaycheck,
        this.numPaychecks = data.numPaychecks;
    });
  }
}
