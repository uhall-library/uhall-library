import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinderSettingsComponent } from './finder-settings.component';

describe('FinderSettingsComponent', () => {
  let component: FinderSettingsComponent;
  let fixture: ComponentFixture<FinderSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinderSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinderSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
