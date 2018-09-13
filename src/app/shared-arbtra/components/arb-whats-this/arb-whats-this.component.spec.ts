import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbWhatsThisComponent } from './arb-whats-this.component';

describe('ArbWhatsThisComponent', () => {
  let component: ArbWhatsThisComponent;
  let fixture: ComponentFixture<ArbWhatsThisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArbWhatsThisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbWhatsThisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
