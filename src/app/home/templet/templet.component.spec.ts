import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempletComponent } from './templet.component';

describe('TempletComponent', () => {
  let component: TempletComponent;
  let fixture: ComponentFixture<TempletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
