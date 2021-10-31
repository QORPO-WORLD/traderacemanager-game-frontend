import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreditSystemComponent } from './credit-system.component';

describe('CreditSystemComponent', () => {
  let component: CreditSystemComponent;
  let fixture: ComponentFixture<CreditSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditSystemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreditSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
