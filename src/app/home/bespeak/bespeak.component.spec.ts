import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BespeakComponent } from './bespeak.component';

describe('BespeakComponent', () => {
  let component: BespeakComponent;
  let fixture: ComponentFixture<BespeakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BespeakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BespeakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
