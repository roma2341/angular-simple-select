import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Example2ThemedSelect } from './example-2-themed-select';

describe('Example2ThemedSelect', () => {
  let component: Example2ThemedSelect;
  let fixture: ComponentFixture<Example2ThemedSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Example2ThemedSelect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Example2ThemedSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
