import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildChannelModifyComponent } from './child-channel-modify.component';

describe('ChildChannelModifyComponent', () => {
  let component: ChildChannelModifyComponent;
  let fixture: ComponentFixture<ChildChannelModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildChannelModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildChannelModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
