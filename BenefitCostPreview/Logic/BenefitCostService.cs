using BenefitCostPreview.Interfaces;
using BenefitCostPreview.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BenefitCostPreview.Logic
{
    public class BenefitCostService : IBenefitCostService
    {
        private const decimal EmployeeYearlyBenefitCost = 1000;
        private const decimal DependentYearlyBenefitCost = 500;
        private const decimal NumPaychecks = 26;
        private const decimal EmployeePaycheck = 2000;

        public PaycheckSummary CalculateBenefitCostPreview(string employeeFirstName, IEnumerable<string> dependentFirstNames = null)
        {
            dependentFirstNames = dependentFirstNames?.ToList();

            if (string.IsNullOrEmpty(employeeFirstName) ||  dependentFirstNames != null && dependentFirstNames.Any(string.IsNullOrEmpty))
                throw new Exception("All names must have a value");

            var yearlyBenefitCost = CalculateEmployeeYearlyCost(employeeFirstName);
            if (dependentFirstNames?.Any() ?? false)
            {
                yearlyBenefitCost += dependentFirstNames
                    .Select(CalculateDependentYearlyCost)
                    .Sum();
            }

            var benefitsCost = yearlyBenefitCost / NumPaychecks;

            return new PaycheckSummary{
                BenefitsCost = benefitsCost,
                TakeHomePay = EmployeePaycheck - benefitsCost
            };
        }

        private decimal CalculateEmployeeYearlyCost(string name)
        {
            var discountFactor = GetDiscountFactor(name);
            return CalculateCost(EmployeeYearlyBenefitCost, discountFactor);
        }

        private decimal CalculateDependentYearlyCost(string name)
        {
            var discountFactor = GetDiscountFactor(name);
            return CalculateCost(DependentYearlyBenefitCost, discountFactor);
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
