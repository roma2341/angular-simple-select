import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSelectZigzagFormField } from './ngx-select-zigzag-form-field';

describe('NgxSelectZigzagFormField', () => {
  let component: NgxSelectZigzagFormField;
  let fixture: ComponentFixture<NgxSelectZigzagFormField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxSelectZigzagFormField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxSelectZigzagFormField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
