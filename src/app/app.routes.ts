import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { DsuComponent } from './dsu/dsu.component';

export const routes: Routes = [
    { path: 'dsu', component: DsuComponent },
    { path: '**', component: DefaultComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }