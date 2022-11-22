import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePersonComponent } from './people/create-person/create-person.component';
import { EditPersonComponent } from './people/edit-person/edit-person.component';

const routes: Routes = [
    {
	path: 'create-person',
	component: CreatePersonComponent
    },
    {
	path: 'edit-person',
	component: EditPersonComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
