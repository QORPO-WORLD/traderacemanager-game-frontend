import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IoiloaderComponent } from './ioiloader.component';

describe('IoiloaderComponent', () => {
  let component: IoiloaderComponent;
  let fixture: ComponentFixture<IoiloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IoiloaderComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IoiloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
