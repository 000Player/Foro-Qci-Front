import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SkillUpdatePage } from './skill-update.page';

describe('SkillUpdatePage', () => {
  let component: SkillUpdatePage;
  let fixture: ComponentFixture<SkillUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillUpdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SkillUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
