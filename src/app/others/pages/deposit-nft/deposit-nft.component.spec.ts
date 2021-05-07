import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DepositNftComponent } from './deposit-nft.component';

describe('DepositNftComponent', () => {
  let component: DepositNftComponent;
  let fixture: ComponentFixture<DepositNftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositNftComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DepositNftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
