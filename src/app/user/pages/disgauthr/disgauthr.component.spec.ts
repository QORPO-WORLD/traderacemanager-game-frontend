import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GauthrComponent } from './gauthr.component';

describe('GauthrComponent', () => {
  let component: GauthrComponent;
  let fixture: ComponentFixture<GauthrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GauthrComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GauthrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
