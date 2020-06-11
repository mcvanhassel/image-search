import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      {
        path: 'welcome',
        loadChildren: () => import('./features/welcome/welcome.module').then(m => m.WelcomeModule),
      },
      {
        path: 'search',
        loadChildren: () => import('./features/search/search.module').then(m => m.SearchModule),
      },
      {
        path: 'not-found',
        loadChildren: () => import('./features/not-found/not-found.module').then(m => m.NotFoundModule),
      },
      { path: '**', redirectTo: 'not-found' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
