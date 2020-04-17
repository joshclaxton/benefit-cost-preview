using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BenefitCostPreview.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BenefitCost : ControllerBase
    {
        private readonly ILogger<BenefitCost> _logger;

        public BenefitCost(ILogger<BenefitCost> logger)
        {
            _logger = logger;
        }

        // todo
        [HttpGet]
        public void Get()
        {
           throw new NotImplementedException();
        }
    }
}
