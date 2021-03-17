import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyQuestionsPage } from './my-questions.page';

describe('MyQuestionsPage', () => {
  let component: MyQuestionsPage;
  let fixture: ComponentFixture<MyQuestionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyQuestionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyQuestionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
