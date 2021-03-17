import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuestionFormPage } from './question-form.page';

describe('QuestionFormPage', () => {
  let component: QuestionFormPage;
  let fixture: ComponentFixture<QuestionFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
