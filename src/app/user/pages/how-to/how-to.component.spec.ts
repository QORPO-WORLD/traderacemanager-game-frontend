import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HowToComponent } from './how-to.component';

describe('HowToComponent', () => {
  let component: HowToComponent;
  let fixture: ComponentFixture<HowToComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HowToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
