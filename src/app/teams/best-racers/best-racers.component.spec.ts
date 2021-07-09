import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BestRacersComponent } from './best-racers.component';

describe('BestRacersComponent', () => {
  let component: BestRacersComponent;
  let fixture: ComponentFixture<BestRacersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestRacersComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BestRacersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
