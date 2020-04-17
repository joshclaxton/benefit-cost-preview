using BenefitCostPreview.Interfaces;
using BenefitCostPreview.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BenefitCostPreview.Logic
{
    public class BenefitCostService : IBenefitCostService
    {

        private readonly decimal employeeYearlyBenefitCost = 1000;
        private readonly decimal dependendentYearlyBenefitCost = 500;
        private readonly decimal numPaychecks = 26;
        private readonly decimal employeePaycheck = 2000;

        public PaycheckSummary CalculateBenefitCostPreview(string employeeFirstName, IEnumerable<string> dependentFirstNames = null)
        {
            dependentFirstNames = dependentFirstNames?.ToList();

            if (string.IsNullOrEmpty(employeeFirstName) ||  dependentFirstNames != null && dependentFirstNames.Any(string.IsNullOrEmpty))
                throw new Exception("All names must have a value");

            var yearlyBenefitCost = this.CalculateEmployeeYearlyCost(employeeFirstName);
            if (dependentFirstNames?.Any() ?? false)
            {
                yearlyBenefitCost += dependentFirstNames
                    .Select(this.CalculateDependentYearlyCost)
                    .Sum();
            }

            var benefitsCost = yearlyBenefitCost / this.numPaychecks;

            return new PaycheckSummary{
                BenefitsCost = benefitsCost,
                TakeHomePay = this.employeePaycheck - benefitsCost
            };
        }

        private decimal CalculateEmployeeYearlyCost(string name)
        {
            var discountFactor = this.GetDiscountFactor(name);
            return this.CalculateCost(this.employeeYearlyBenefitCost, discountFactor);
        }

        private decimal CalculateDependentYearlyCost(string name)
        {
            var discountFactor = this.GetDiscountFactor(name);
            return this.CalculateCost(this.dependendentYearlyBenefitCost, discountFactor);
        }

        private decimal CalculateCost(decimal baseCost, decimal discountFactor)
        {
            return baseCost * discountFactor;
        }

        private decimal GetDiscountFactor(string name)
        {
            return name[0] switch
            {
                'A' => 0.9M,
                'a' => 0.9M,
                _ => 1
            };
        }
    }
}
