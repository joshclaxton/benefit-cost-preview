using System;
using BenefitCostPreview.Interfaces;
using BenefitCostPreview.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BenefitCostPreview.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class BenefitCostController : ControllerBase
    {
        private readonly IBenefitCostService _benefitCostService;

        private readonly ILogger<BenefitCostController> _logger;

        public BenefitCostController(IBenefitCostService benefitCostService, ILogger<BenefitCostController> logger)
        {
            _benefitCostService = benefitCostService;
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<BenefitCostAssumptions> GetBenefitsCostAssumptions()
        {
            return _benefitCostService.BenefitsCostAssumptions;
        }

        [HttpPost]
        public ActionResult<PaycheckSummary> CalculateBenefitCostPreview(CalculateBenefitCostPreviewInputModel inputModel)
        {
            try
            {
                return _benefitCostService.CalculateBenefitCostPreview(inputModel.EmployeeFirstName,
                    inputModel.DependentFirstNames);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
