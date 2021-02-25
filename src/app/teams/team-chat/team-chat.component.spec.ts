import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeamChatComponent } from './team-chat.component';

describe('TeamChatComponent', () => {
  let component: TeamChatComponent;
  let fixture: ComponentFixture<TeamChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamChatComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeamChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
