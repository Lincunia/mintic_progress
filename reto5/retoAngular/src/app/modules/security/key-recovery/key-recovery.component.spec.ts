import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyRecoveryComponent } from './key-recovery.component';

describe('KeyRecoveryComponent', () => {
  let component: KeyRecoveryComponent;
  let fixture: ComponentFixture<KeyRecoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyRecoveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
