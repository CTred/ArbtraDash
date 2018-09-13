import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDocsComponent } from './viewdocs.component';

describe('ViewDocsComponent', () => {
  let component: ViewDocsComponent;
  let fixture: ComponentFixture<ViewDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
