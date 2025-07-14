import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Example3PrimitiveValuesBinding } from './example-3-primitive-values-binding';

describe('Example3PrimitiveValuesBinding', () => {
  let component: Example3PrimitiveValuesBinding;
  let fixture: ComponentFixture<Example3PrimitiveValuesBinding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Example3PrimitiveValuesBinding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Example3PrimitiveValuesBinding);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
