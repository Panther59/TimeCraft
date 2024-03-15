import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalService } from '../_services/local.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent {
  formGrp: any = new FormGroup({
    squad: new FormControl(''),
    members: new FormControl(''),
    timeInterval: new FormControl(120)
  });

  constructor(
    private router: Router,
    private localService: LocalService) {
    const squad = localService.getData('squad') ?? '';
    const members = localService.getData('members') ?? '';
    const timeInterval = localService.getNumber('timeInterval') ?? 120;
    this.formGrp = new FormGroup({
      squad: new FormControl(squad),
      members: new FormControl(members),
      timeInterval: new FormControl(timeInterval)
    });
  }

  onSubmit() {
    if(this.formGrp.valid){
      this.localService.saveData('squad', this.formGrp.value.squad);
      this.localService.saveData('members', this.formGrp.value.members);
      this.localService.saveData('timeInterval', this.formGrp.value.timeInterval);

      this.router.navigateByUrl(`dsu?squad=${this.formGrp.value.squad.trim()}&members=${this.formGrp.value.members.trim()}&interval=${this.formGrp.value.timeInterval}`);
    }
  }
}
