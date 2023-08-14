import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabezalDialogComponent } from './cabezal-dialog.component';

describe('CabezalDialogComponent', () => {
  let component: CabezalDialogComponent;
  let fixture: ComponentFixture<CabezalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabezalDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabezalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
