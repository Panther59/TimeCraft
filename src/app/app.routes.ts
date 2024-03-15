import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DsuComponent } from './dsu/dsu.component';
import { DefaultComponent } from './default/default.component';

export const routes: Routes = [
    { path: 'dsu', component: DsuComponent },
    { path: '**', component: DefaultComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }