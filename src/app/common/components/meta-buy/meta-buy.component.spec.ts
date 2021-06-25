import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MetaBuyComponent } from './meta-buy.component';

describe('MetaBuyComponent', () => {
  let component: MetaBuyComponent;
  let fixture: ComponentFixture<MetaBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetaBuyComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MetaBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
