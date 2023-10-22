export class WebStorageUtil{
    static get(key:string): any{
        return JSON.parse(localStorage.getItem(key)!);
    }
}