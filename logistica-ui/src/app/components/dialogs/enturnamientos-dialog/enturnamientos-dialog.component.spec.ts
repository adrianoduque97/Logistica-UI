import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnturnamientosDialogComponent } from './enturnamientos-dialog.component';

describe('EnturnamientosDialogComponent', () => {
  let component: EnturnamientosDialogComponent;
  let fixture: ComponentFixture<EnturnamientosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnturnamientosDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnturnamientosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
