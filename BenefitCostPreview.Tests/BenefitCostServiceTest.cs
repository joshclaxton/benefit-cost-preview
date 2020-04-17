using System;
using System.Collections.Generic;
using BenefitCostPreview.Logic;
using Xunit;

namespace BenefitCostPreview.Tests
{
    public class BenefitCostServiceTest
    {
        private const string DiscountName = "AName";
        private const string NonDiscountName = "BName";

        private readonly BenefitCostService _benefitCostService;
        public BenefitCostServiceTest()
        {
            _benefitCostService = new BenefitCostService();
        }

        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData(NonDiscountName, new[] { NonDiscountName, null })]
        [InlineData(NonDiscountName, new[] { NonDiscountName, "" })]
        public void Should_ThrowException_When_InvalidInput(string employeeName, IEnumerable<string> dependentNames = null)
        {
            var ex = Assert.Throws<ArgumentException>(() => _benefitCostService.CalculateBenefitCostPreview(employeeName, dependentNames));
            Assert.Equal("All names must have a value", ex.Message);
        }

        [Theory]
        [InlineData(NonDiscountName, null)]
        [InlineData(NonDiscountName, new string[0])]
        public void Should_Calculate_When_GivenAlternateInputForDependentNames(string employeeName, IEnumerable<string> dependentNames = null)
        {
            var result = _benefitCostService.CalculateBenefitCostPreview(employeeName, dependentNames);
            Assert.Equal(38.46M,result.BenefitsCost,2);
        }

        public static IEnumerable<object[]> NonDiscountedTestData()
        {
            yield return new object[] { NonDiscountName, null, 38.46M};
            yield return new object[] { NonDiscountName, new[]{NonDiscountName}, 57.69M };
            yield return new object[] { NonDiscountName, new[] { NonDiscountName, NonDiscountName }, 76.92M };
        }

        [Theory]
        [MemberData(nameof(NonDiscountedTestData))]
        public void Should_CalculateBenefitsCost_When_ThereAreNoDiscounts(string employeeName, IEnumerable<string> dependentNames, decimal expected)
        {
            var result = _benefitCostService.CalculateBenefitCostPreview(employeeName, dependentNames);
            Assert.Equal(expected, result.BenefitsCost, 2);
        }

        public static IEnumerable<object[]> DiscountedTestData()
        {
            yield return new object[] { DiscountName, null, 34.62M };
            yield return new object[] { DiscountName, new[] { DiscountName }, 51.92M };
            yield return new object[] { DiscountName, new[] { DiscountName, DiscountName }, 69.23M };
        }

        [Theory]
        [MemberData(nameof(DiscountedTestData))]
        public void Should_CalculateBenefitsCost_When_ThereAreOnlyDiscounts(string employeeName, IEnumerable<string> dependentNames, decimal expected)
        {
            var result = _benefitCostService.CalculateBenefitCostPreview(employeeName, dependentNames);
            Assert.Equal(expected, result.BenefitsCost, 2);
        }


        public static IEnumerable<object[]> MixedTestData()
        {
            yield return new object[] { DiscountName, new[] { NonDiscountName }, 53.85M };
            yield return new object[] { NonDiscountName, new[] { DiscountName }, 55.77M };
            yield return new object[] { NonDiscountName, new[] { DiscountName, DiscountName }, 73.08M };
            yield return new object[] { NonDiscountName, new[] { NonDiscountName, DiscountName }, 75M };
        }

        [Theory]
        [MemberData(nameof(MixedTestData))]
        public void Should_CalculateBenefitsCost_When_ThereAreDiscountsAndNoDiscounts(string employeeName, IEnumerable<string> dependentNames, decimal expected)
        {
            var result = _benefitCostService.CalculateBenefitCostPreview(employeeName, dependentNames);
            Assert.Equal(expected, result.BenefitsCost, 2);
        }

        [Fact]
        public void Should_CalculateTakeHomePay()
        {
            var result = _benefitCostService.CalculateBenefitCostPreview(NonDiscountName, new List<string> { NonDiscountName,DiscountName});
            Assert.Equal(1925M, result.TakeHomePay, 2);
        }

        [Fact]
        public void Should_CalculateTheSame_When_LowerCase()
        {
            var lowerCase = _benefitCostService.CalculateBenefitCostPreview("aName");
            Assert.Equal(34.62M, lowerCase.BenefitsCost, 2);
        }

    }
}
