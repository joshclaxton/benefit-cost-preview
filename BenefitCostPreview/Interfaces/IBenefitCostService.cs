using BenefitCostPreview.Models;
using System.Collections.Generic;

namespace BenefitCostPreview.Interfaces
{
    public interface IBenefitCostService
    {
        PaycheckSummary CalculateBenefitCostPreview(string employeeFirstName, IEnumerable<string> dependentFirstNames = null);
        BenefitCostAssumptions BenefitsCostAssumptions { get; }
    }
}