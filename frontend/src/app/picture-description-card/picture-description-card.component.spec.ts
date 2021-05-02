import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureDescriptionCardComponent } from './picture-description-card.component';

describe('PictureDescriptionCardComponent', () => {
  let component: PictureDescriptionCardComponent;
  let fixture: ComponentFixture<PictureDescriptionCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureDescriptionCardComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureDescriptionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
