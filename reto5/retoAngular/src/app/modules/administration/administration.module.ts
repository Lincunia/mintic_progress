import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { CreatePersonComponent } from './people/create-person/create-person.component';
import { EditPersonComponent } from './people/edit-person/edit-person.component';
import { DeletePersonComponent } from './people/delete-person/delete-person.component';
import { SearchPersonComponent } from './people/search-person/search-person.component';


@NgModule({
  declarations: [
    CreatePersonComponent,
    EditPersonComponent,
    DeletePersonComponent,
    SearchPersonComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
