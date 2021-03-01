import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransferNftComponent } from './transfer-nft.component';

describe('TransferNftComponent', () => {
  let component: TransferNftComponent;
  let fixture: ComponentFixture<TransferNftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferNftComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransferNftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
