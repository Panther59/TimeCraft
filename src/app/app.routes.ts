import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { DsuComponent } from './dsu/dsu.component';
import { MeetinInProgressGuard } from './_guards/meetinInProgressGuard';

export const routes: Routes = [
    { path: 'dsu', component: DsuComponent, canDeactivate:[MeetinInProgressGuard] },
    { path: '**', component: DefaultComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }