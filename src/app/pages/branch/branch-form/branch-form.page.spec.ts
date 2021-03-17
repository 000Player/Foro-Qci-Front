import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BranchFormPage } from './branch-form.page';

describe('BranchFormPage', () => {
  let component: BranchFormPage;
  let fixture: ComponentFixture<BranchFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BranchFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
