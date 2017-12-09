import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropagandaStatisticsComponent } from './propaganda-statistics.component';

describe('PropagandaStatisticsComponent', () => {
  let component: PropagandaStatisticsComponent;
  let fixture: ComponentFixture<PropagandaStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropagandaStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropagandaStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
