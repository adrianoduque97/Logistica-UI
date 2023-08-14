import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GPSDialogComponent } from './gps-dialog.component';

describe('CabezalDialogComponent', () => {
  let component: GPSDialogComponent;
  let fixture: ComponentFixture<GPSDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GPSDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GPSDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
