import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CsearchComponentComponent } from './csearch-component/csearch-component.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: CsearchComponentComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
