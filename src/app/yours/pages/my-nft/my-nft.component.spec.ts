import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyNftComponent } from './my-nft.component';

describe('MyNftComponent', () => {
  let component: MyNftComponent;
  let fixture: ComponentFixture<MyNftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyNftComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyNftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
