import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSelectLibrary } from './ngx-select-library';

describe('NgxSelectLibrary', () => {
  let component: NgxSelectLibrary;
  let fixture: ComponentFixture<NgxSelectLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxSelectLibrary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxSelectLibrary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
