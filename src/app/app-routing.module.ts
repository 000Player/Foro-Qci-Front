import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/user/login/login.module').then(m => m.LoginPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'lost-password',
    loadChildren: () => import('./pages/user/lost-password/lost-password.module').then(m => m.LostPasswordPageModule)
  },
  {
    path: 'new-account',
    loadChildren: () => import('./pages/user/new-account/new-account.module').then(m => m.NewAccountPageModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./pages/event/events/events.module').then(m => m.EventsPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'event-form/:id',
    loadChildren: () => import('./pages/event/event-form/event-form.module').then(m => m.EventFormPageModule)
  },
  {
    path: 'questions',
    loadChildren: () => import('./pages/question/questions/questions.module').then(m => m.QuestionsPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'question-view/:id',
    loadChildren: () => import('./pages/question/question-view/question-view.module').then(m => m.QuestionViewPageModule)
  },
  {
    path: 'my-questions',
    loadChildren: () => import('./pages/question/my-questions/my-questions.module').then(m => m.MyQuestionsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'question-form/:id',
    loadChildren: () => import('./pages/question/question-form/question-form.module').then(m => m.QuestionFormPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./pages/help/help/help.module').then(m => m.HelpPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'tag-form/:id',
    loadChildren: () => import('./pages/tag/tag-form/tag-form.module').then(m => m.TagFormPageModule)
  },
  {
    path: 'skill-form/:id',
    loadChildren: () => import('./pages/skill/skill-form/skill-form.module').then(m => m.SkillFormPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/user/profile/profile.module').then(m => m.ProfilePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'skill-update/:id',
    loadChildren: () => import('./pages/skill/skill-update/skill-update.module')
      .then(m => m.SkillUpdatePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'branches',
    loadChildren: () => import('./pages/branch/branches/branches.module').then(m => m.BranchesPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'branch-form/:id',
    loadChildren: () => import('./pages/branch/branch-form/branch-form.module').then(m => m.BranchFormPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/user/users/users.module').then(m => m.UsersPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'about', component: AboutComponent, canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
