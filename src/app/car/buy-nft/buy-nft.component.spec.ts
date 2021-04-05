import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuyNftComponent } from './buy-nft.component';

describe('BuyNftComponent', () => {
  let component: BuyNftComponent;
  let fixture: ComponentFixture<BuyNftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyNftComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuyNftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
