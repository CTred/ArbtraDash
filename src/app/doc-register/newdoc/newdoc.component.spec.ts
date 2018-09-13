import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDocComponent } from './newdoc.component';

describe('NewdocComponent', () => {
  let component: NewDocComponent;
  let fixture: ComponentFixture<NewDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
