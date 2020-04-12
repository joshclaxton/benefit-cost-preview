import { Component, OnInit } from '@angular/core';
import { BenefitCostService } from 'src/app/services/benefit-cost/benefit-cost.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public numPaychecks: number;
  public employeePaycheck: number;
  constructor(private benefitCostService: BenefitCostService) { }

  ngOnInit() {
    this.employeePaycheck = this.benefitCostService.employeePaycheck;
    this.numPaychecks = this.benefitCostService.numPaychecks;
  }

}
