import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UnityraceComponent } from './unityrace.component';

describe('UnityraceComponent', () => {
  let component: UnityraceComponent;
  let fixture: ComponentFixture<UnityraceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnityraceComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UnityraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
