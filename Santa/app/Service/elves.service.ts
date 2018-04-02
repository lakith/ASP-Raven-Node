import{ Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { IElf } from '../Models/IElf';


@Injectable()
export class ElfService {
    constructor(private _http: Http) {}

    //----------------------------------------------
    // Get all Elves From Raven Store
    //----------------------------------------------
    GetAllElves(url: string): Observable<any> {
        return this._http.get(url)
            .map((response: Response) => <any>response.json())
            .catch(ElfService.handleError);
    }
    //---------------------------------------------
    //Create Elf 
    //---------------------------------------------
    CreateElf(url: string, model: IElf): Observable<any> 
    {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url, body, options)
            .map((response: Response) => <any>response.json())
            .catch(ElfService.handleError);
    }
    //---------------------------------------------
    // Update Elf Record
    //---------------------------------------------
    UpdateElf(url: string, model: IElf): Observable<any>
    {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.put(url, body, options)
            .map((response: Response) => <any>response.json())
            .catch(ElfService.handleError);
    }
    //--------------------------------------------
    // Delete Record By Document Id
    //--------------------------------------------
    DeleteElf(url: string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.delete(url,options)
            .map((response: Response) => <any>response.json())
            .catch(ElfService.handleError);
                
    }
    //--------------------------------------------
    // Filter Records By filters
    //--------------------------------------------
    GetAllWithFilters(url: string): Observable<any> {
        return this._http.get(url)
            .map((response: Response) => <any>response.json())
            .catch(ElfService.handleError);
    }
    private static handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}

