import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SynergizerComponent } from './synergizer.component';

describe('SynergizerComponent', () => {
  let component: SynergizerComponent;
  let fixture: ComponentFixture<SynergizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynergizerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SynergizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
