import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildChannelAddComponent } from './child-channel-add.component';

describe('ChildChannelAddComponent', () => {
  let component: ChildChannelAddComponent;
  let fixture: ComponentFixture<ChildChannelAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildChannelAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildChannelAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
