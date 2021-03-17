import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuestionViewPage } from './question-view.page';

describe('QuestionViewPage', () => {
  let component: QuestionViewPage;
  let fixture: ComponentFixture<QuestionViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
