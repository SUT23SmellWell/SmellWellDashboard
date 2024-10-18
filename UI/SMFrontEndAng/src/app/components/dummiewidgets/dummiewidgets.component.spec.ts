import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummiewidgetsComponent } from './dummiewidgets.component';

describe('DummiewidgetsComponent', () => {
  let component: DummiewidgetsComponent;
  let fixture: ComponentFixture<DummiewidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DummiewidgetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DummiewidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
