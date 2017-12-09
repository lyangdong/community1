import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildChannelComponent } from './child-channel.component';

describe('ChildChannelComponent', () => {
  let component: ChildChannelComponent;
  let fixture: ComponentFixture<ChildChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
