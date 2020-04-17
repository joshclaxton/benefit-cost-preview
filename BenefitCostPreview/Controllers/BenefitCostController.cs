using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BenefitCostPreview.Interfaces;
using BenefitCostPreview.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BenefitCostPreview.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
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
        public PaycheckSummary PaycheckPreview(string employeeFirstName, IEnumerable<string> dependentFirstNames)
        {
            // todo error handle + http response codes
            return _benefitCostService.CalculateBenefitCostPreview(employeeFirstName, dependentFirstNames);
        }
    }
}
