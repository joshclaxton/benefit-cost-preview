import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render instructions', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#instructions').textContent)
      .toContain('Enter the first names of each employee and their dependents');
  });

  it('should render assumptions', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#assumptions').textContent)
      .toContain('This assumes all employees are paid $2000 per paycheck before deductions and there are 26 paychecks per year. ' +
        'Note: this is a preview. ' +
        'Individual paychecks throughout the year may differ by a few pennies to account for uneven division per pay period.');
  });
});
