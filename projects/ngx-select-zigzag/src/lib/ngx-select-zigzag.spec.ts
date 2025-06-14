import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSelectZigzag } from './ngx-select-zigzag';

describe('NgxSelectZigzag', () => {
  let component: NgxSelectZigzag;
  let fixture: ComponentFixture<NgxSelectZigzag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxSelectZigzag]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxSelectZigzag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
