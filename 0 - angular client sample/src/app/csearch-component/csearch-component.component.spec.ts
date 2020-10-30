import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsearchComponentComponent } from './csearch-component.component';

describe('CsearchComponentComponent', () => {
  let component: CsearchComponentComponent;
  let fixture: ComponentFixture<CsearchComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsearchComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsearchComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
