import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NextRacesComponent } from './next-races.component';

describe('NextRacesComponent', () => {
  let component: NextRacesComponent;
  let fixture: ComponentFixture<NextRacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextRacesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NextRacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
