import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BinaryInitialSelectionComponent } from './binary-initial-selection.component';

describe('BinaryInitialSelectionComponent', () => {
  let component: BinaryInitialSelectionComponent;
  let fixture: ComponentFixture<BinaryInitialSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinaryInitialSelectionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BinaryInitialSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
