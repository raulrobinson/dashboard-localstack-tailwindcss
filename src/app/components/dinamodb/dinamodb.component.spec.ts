import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamodbComponent } from './dinamodb.component';

describe('DinamodbComponent', () => {
  let component: DinamodbComponent;
  let fixture: ComponentFixture<DinamodbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DinamodbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DinamodbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
