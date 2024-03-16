import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { DsuComponent } from "../dsu/dsu.component";
import { of, switchMap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class MeetinInProgressGuard implements CanDeactivate<DsuComponent> {
    canDeactivate(component: DsuComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return component.isDirty$.pipe(
            switchMap((x) => {
                if (x === false) {
                    return of(true);
                } else {
                    alert('Meeting is in Progress, are you sure you want to leave?')
                    return of(false);
                }
            })
        );
    }
}