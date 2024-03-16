import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DailyDSU, MemberData } from '../_models/dailyDSU';
import { LocalService } from '../_services/local.service';
import '../global';

@Component({
  selector: 'app-dsu',
  templateUrl: './dsu.component.html',
  styleUrls: ['./dsu.component.scss']
})
export class DsuComponent implements OnInit {
  tryingForSkippedUser = false;
  meetingOver = false;
  timeInterval = 120;
  dataPresent = false;
  dsuData?: DailyDSU;
  currentMember?: MemberData;
  nextMember?: MemberData;
  currentMemberIndex?: number;
  timerStarted = false;
  isPaused = false;
  meetingStarted = false;
  interval: any;
  squad: string = '';
  skippedList: Array<number> = [];

  constructor(
    private route: ActivatedRoute,
    private localService: LocalService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.forEach((params: Params) => {
      if (params['interval']) {
        this.timeInterval = +params['interval'];
      }
      if (params['squad']) {
        this.squad = params['squad'];
      } else {
        this.squad = 'Agile';
      }

      if (params['members']) {
        var members = params['members'].split(',').flatMap((x: String, i: number) => {
          return { name: x.trim() }
        });
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        this.dsuData = { date: today, squad: this.squad, allotedIntervalInSec: this.timeInterval, members }
        this.currentMemberIndex = 0;
        this.setUserData();
      }
    });
  }
  setUserData() {
    if (this.currentMemberIndex !== undefined && this.dsuData?.members !== undefined) {
      this.currentMember = this.dsuData?.members[this.currentMemberIndex];
      this.currentMember.status = undefined;
      if (this.currentMemberIndex < this.dsuData?.members.length - 1) {
        this.nextMember = this.dsuData?.members[this.currentMemberIndex + 1];
      } else {
        this.nextMember = undefined;
      }
    }
  }

  startTimer() {
    this.isPaused = false;
    this.timerStarted = true;
    this.meetingStarted = true;
    if (this.dsuData) {
      this.interval = setInterval(() => {
        if (this.currentMember) {
          this.currentMember.timeTakenInSec = (this.currentMember?.timeTakenInSec ?? 0) + 1;
        }
      }, 1000)
    }
  }

  pauseTimer() {
    this.isPaused = true;
    clearInterval(this.interval);
  }

  resumeTimer() {
    this.isPaused = false;
    this.startTimer();
  }


  goForNextMember() {
    if (this.nextMember !== undefined && this.currentMemberIndex !== undefined) {
      this.currentMemberIndex = this.currentMemberIndex + 1;
      this.setUserData();
      setTimeout(() => {
        this.startTimer()
      }, 1);
    }
  }

  nextMemberClicked() {
    try {

      this.pauseTimer();
      if (this.currentMember) {
        this.currentMember.status = 'Done';
      }
      this.goForNextMember();

    } catch (error) {
      console.error(error);
    }
  }


  comebackLater() {
    try {

      this.pauseTimer();

      if (this.currentMemberIndex !== undefined) {
        if (this.currentMember) {
          this.currentMember.timeTakenInSec = undefined;
          this.currentMember.status = 'Pending';
        }

        let moveMember = this.dsuData?.members[this.currentMemberIndex];
        this.dsuData?.members.splice(this.currentMemberIndex, 1);
        if (moveMember) {
          this.dsuData?.members.push(moveMember);
        }
        this.currentMemberIndex = this.currentMemberIndex - 1;
      }

      if (this.nextMember !== undefined && this.currentMemberIndex !== undefined) {
        this.goForNextMember();
      } else {
        this.completeMeeting();
      }

    } catch (error) {
      console.error(error);
    }
  }
  skipMember() {
    try {

      this.pauseTimer();
      if (this.currentMember) {
        this.currentMember.status = 'Skipped';
        this.currentMember.timeTakenInSec = undefined;
        if (this.currentMemberIndex) {
          this.skippedList.push(this.currentMemberIndex);
        }
      }

      if (this.nextMember !== undefined && this.currentMemberIndex !== undefined) {
        this.goForNextMember();
      } else {
        this.completeMeeting();
      }

    } catch (error) {
      console.error(error);
    }
  }

  startMember(member: MemberData) {
    try {

      this.pauseTimer();
      if (this.currentMemberIndex !== undefined) {
        if (this.currentMember) {
          this.currentMember.timeTakenInSec = undefined;
          this.currentMember.status = 'Pending';
        }
        const selectedMemberIndex = this.dsuData?.members.findIndex(x => x.name == member.name);

        if (selectedMemberIndex) {
          this.dsuData?.members.splice(selectedMemberIndex, 1);
          this.dsuData?.members.insertAt(this.currentMemberIndex, member);
        }

        this.currentMemberIndex = this.currentMemberIndex - 1;
        this.goForNextMember();
      }

    } catch (error) {
      console.error(error);
    }
  }

  completeMeeting() {
    try {

      this.pauseTimer();
      if (this.currentMember) {
        this.currentMember.status = 'Done';
      }

      this.meetingOver = true;
      this.currentMemberIndex = undefined;
      this.currentMember = undefined;
      this.nextMember = undefined;
      this.localService.saveData(`DSUData-${this.dsuData?.date.toLocaleDateString()}`, JSON.stringify(this.dsuData));

    } catch (error) {
      console.error(error);
    }
  }
}
