import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TagFormPage } from './tag-form.page';

describe('TagFormPage', () => {
  let component: TagFormPage;
  let fixture: ComponentFixture<TagFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TagFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
