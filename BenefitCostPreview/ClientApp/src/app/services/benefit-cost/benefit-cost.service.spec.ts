import { TestBed } from '@angular/core/testing';

import { BenefitCostService } from './benefit-cost.service';

describe('BenefitCostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  const discountName = 'A';
  const nonDiscountName = 'B';

  it('should throw for null employee name', () => {
    const service: BenefitCostService = TestBed.get(BenefitCostService);
    expect(() => service.calculatePaycheckPreview(null)).toThrowError('All names must have a value');
  });

  it('should throw for empty employee name', () => {
    const service: BenefitCostService = TestBed.get(BenefitCostService);
    expect(() => service.calculatePaycheckPreview('')).toThrowError('All names must have a value');
  });

  it('should throw if any dependent name is null', () => {
    const service: BenefitCostService = TestBed.get(BenefitCostService);
    expect(() => service.calculatePaycheckPreview(nonDiscountName, [discountName, null])).toThrowError('All names must have a value');
  });

  it('should throw if any dependent name is empty', () => {
    const service: BenefitCostService = TestBed.get(BenefitCostService);
    expect(() => service.calculatePaycheckPreview(nonDiscountName, [discountName, ''])).toThrowError('All names must have a value');
  });

  it('should treat empty array of dependents as having no dependents', () => {
    const service: BenefitCostService = TestBed.get(BenefitCostService);
    const result = service.calculatePaycheckPreview(nonDiscountName, []);
    expect(result.benefitsCost).toBeCloseTo(38.46);
  });

  it('should treat null array of dependents as having no dependents', () => {
    const service: BenefitCostService = TestBed.get(BenefitCostService);
    const result = service.calculatePaycheckPreview(nonDiscountName, null);
    expect(result.benefitsCost).toBeCloseTo(38.46);
  });

  it('should calculate cost of benefits for non-discounted employee with no dependents', () => {
    const service: BenefitCostService = TestBed.get(BenefitCostService);
    const result = service.calculatePaycheckPreview(nonDiscountName);
    expect(result.benefitsCost).toBeCloseTo(38.46);
  });

  it('should calculate cost of benefits for discounted employee with no dependents', () => {
    const service: BenefitCostService = TestBed.get(BenefitCostService);
    const result = service.calculatePaycheckPreview(discountName);
    expect(result.benefitsCost).toBeCloseTo(34.62);
  });

  it('should calculate cost of benefits for non-discounted employee with a non-discounted dependent', () => {
    const service: BenefitCostService = TestBed.get(BenefitCostService);
    const result = service.calculatePaycheckPreview(nonDiscountName, [nonDiscountName]);
    expect(result.benefitsCost).toBeCloseTo(57.69);
  });

  it('should calculate cost of benefits for discounted employee with a non-discounted dependent', () => {
    const service: BenefitCostService = TestBed.get(BenefitCostService);
    const result = service.calculatePaycheckPreview(discountName, [nonDiscountName]);
    expect(result.benefitsCost).toBeCloseTo(53.85);
  });

  it('should calculate cost of benefits for non-discounted employee with a discounted dependent', () => {
    const service: BenefitCostService = TestBed.get(BenefitCostService);
    const result = service.calculatePaycheckPreview(nonDiscountName, [discountName]);
    expect(result.benefitsCost).toBeCloseTo(55.77);
  });

  it('should calculate cost of benefits for discounted employee with a discounted dependent', () => {
    const service: BenefitCostService = TestBed.get(BenefitCostService);
    const result = service.calculatePaycheckPreview(discountName, [discountName]);
    expect(result.benefitsCost).toBeCloseTo(51.92);
  });

  it('should calculate cost of benefits for non-discounted employee with multiple non-discounted dependents', () => {
    const service: BenefitCostService = TestBed.get(BenefitCostService);
    const result = service.calculatePaycheckPreview(nonDiscountName, [nonDiscountName, nonDiscountName]);
    expect(result.benefitsCost).toBeCloseTo(76.92);
  });

  it('should calculate cost of benefits for non-discounted employee with multiple discounted dependents', () => {
    const service: BenefitCostService = TestBed.get(BenefitCostService);
    const result = service.calculatePaycheckPreview(nonDiscountName, [discountName, discountName]);
    expect(result.benefitsCost).toBeCloseTo(73.08);
  });

  it('should calculate cost of benefits for non-discounted employee with a mix of discounted and non-discounted dependents', () => {
    const service: BenefitCostService = TestBed.get(BenefitCostService);
    const result = service.calculatePaycheckPreview(nonDiscountName, [nonDiscountName, discountName]);
    expect(result.benefitsCost).toBeCloseTo(75.00);
  });

  it('should calculate take home pay', () => {
    const service: BenefitCostService = TestBed.get(BenefitCostService);
    const result = service.calculatePaycheckPreview(nonDiscountName, [nonDiscountName, discountName]);
    expect(result.takeHomePay).toBe(1925.00);
  });

  it('should calculate cost of benefits for discounted employee regardless of character casing', () => {
    const service: BenefitCostService = TestBed.get(BenefitCostService);
    const lowerCaseDiscount = service.calculatePaycheckPreview('a');
    const uppperCaseDiscount = service.calculatePaycheckPreview('A');
    expect(lowerCaseDiscount).toEqual(uppperCaseDiscount);
  });

});
