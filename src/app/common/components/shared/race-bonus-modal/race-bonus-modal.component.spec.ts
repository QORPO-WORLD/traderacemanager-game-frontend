import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RaceBonusModalComponent } from './race-bonus-modal.component';

describe('RaceBonusModalComponent', () => {
  let component: RaceBonusModalComponent;
  let fixture: ComponentFixture<RaceBonusModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceBonusModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RaceBonusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
