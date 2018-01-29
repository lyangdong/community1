import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemExampleComponent } from './tem-example.component';

describe('TemExampleComponent', () => {
  let component: TemExampleComponent;
  let fixture: ComponentFixture<TemExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
