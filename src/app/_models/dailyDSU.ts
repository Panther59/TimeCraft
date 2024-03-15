export interface DailyDSU {
    date: Date;
    squad: string;
    allotedIntervalInSec: number;
    members: Array<MemberData>;
}

export interface MemberData {
    name: string;
    timeTakenInSec?: number;
}