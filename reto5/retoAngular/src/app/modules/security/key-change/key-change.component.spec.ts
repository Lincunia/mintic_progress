import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyChangeComponent } from './key-change.component';

describe('KeyChangeComponent', () => {
  let component: KeyChangeComponent;
  let fixture: ComponentFixture<KeyChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
