import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentModifyComponent } from './content-modify.component';

describe('ContentModifyComponent', () => {
  let component: ContentModifyComponent;
  let fixture: ComponentFixture<ContentModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
