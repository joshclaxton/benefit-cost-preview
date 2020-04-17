using System.Collections.Generic;

namespace BenefitCostPreview.Models
{
    public class CalculateBenefitCostPreviewInputModel
    {
        public string EmployeeFirstName { get; set; }
        public IEnumerable<string> DependentFirstNames { get; set; }
    }
}