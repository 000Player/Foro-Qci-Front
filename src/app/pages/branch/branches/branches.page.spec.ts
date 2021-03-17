import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BranchesPage } from './branches.page';

describe('BranchesPage', () => {
  let component: BranchesPage;
  let fixture: ComponentFixture<BranchesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BranchesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
