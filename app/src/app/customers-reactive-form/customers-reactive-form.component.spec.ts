import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersReactiveFormComponent } from './customers-reactive-form.component';

describe('CustomersReactiveFormComponent', () => {
  let component: CustomersReactiveFormComponent;
  let fixture: ComponentFixture<CustomersReactiveFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersReactiveFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
