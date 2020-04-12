import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitPreviewComponent } from './benefit-preview.component';

describe('BenefitPreviewComponent', () => {
  let component: BenefitPreviewComponent;
  let fixture: ComponentFixture<BenefitPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenefitPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
