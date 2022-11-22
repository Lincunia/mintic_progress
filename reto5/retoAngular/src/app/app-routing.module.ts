import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './template/error/error.component';
import { ContentComponent } from './template/content/content.component';

const routes: Routes = [
    {
	path: 'inicio',
	component: ContentComponent
    },
    {
	path: '',
	pathMatch: 'full',
	redirectTo: '/inicio'
    },
    {
	path: 'security',
	loadChildren: ()=>import('./modules/security/security.module').then(x=>x.SecurityModule)
    },
    {
	path: 'administration',
	loadChildren: ()=>import('./modules/administration/administration.module').then(x=>x.AdministrationModule)
    },
    {
	path: '**',
	component: ErrorComponent 
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
