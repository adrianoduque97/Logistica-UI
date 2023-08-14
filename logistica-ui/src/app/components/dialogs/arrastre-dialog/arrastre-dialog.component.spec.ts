import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrastreDialogComponent } from './arrastre-dialog.component';

describe('ArrastreDialogComponent', () => {
  let component: ArrastreDialogComponent;
  let fixture: ComponentFixture<ArrastreDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrastreDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrastreDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
