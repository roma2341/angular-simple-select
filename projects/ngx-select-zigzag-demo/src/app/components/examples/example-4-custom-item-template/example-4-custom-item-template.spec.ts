import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Example4CustomItemTemplate } from './example-4-custom-item-template';

describe('Example4CustomItemTemplate', () => {
  let component: Example4CustomItemTemplate;
  let fixture: ComponentFixture<Example4CustomItemTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Example4CustomItemTemplate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Example4CustomItemTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
