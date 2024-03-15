import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LocalService {
    public saveData(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    public getData(key: string) {
        return localStorage.getItem(key);
    }

    public getNumber(key: string): number | null {
        const data = this.getData(key);
        if (data) {
            return +data;
        } else {
            return null;
        }

    }
    public removeData(key: string) {
        return localStorage.removeItem(key);
    }

    public clearData() {
        return localStorage.clear();
    }

}