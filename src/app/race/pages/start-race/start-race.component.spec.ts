import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StartRaceComponent } from './start-race.component';

describe('StartRaceComponent', () => {
  let component: StartRaceComponent;
  let fixture: ComponentFixture<StartRaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartRaceComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StartRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
