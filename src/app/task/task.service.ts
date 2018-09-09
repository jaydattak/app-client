
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from './task';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { TranslateService } from '../translate.service';

@Injectable()
export class TaskService {
    private baseUrl = "/api/task/";
    constructor(private http: Http, private translateService: TranslateService) { }

    getRequestUrl(endpoint: any) {
        return this.baseUrl + endpoint + "?lang=" + this.translateService.getLocale();
    }

    getAll(): Observable<Task[]> {
        return this.http.get(this.getRequestUrl('list'))
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    getById(id: number): Observable<Task[]> {
        return this.http.get(this.getRequestUrl(id))
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    create(task: Task) {
        console.log(task);
        return this.http.post(this.getRequestUrl('add'), task)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    update(task: Task) {
        return this.http.put(this.getRequestUrl(task.id), task)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    delete(id: number) {
        return this.http.delete(this.getRequestUrl(id))
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    getAllBySort(sortText: string): Observable<Task[]> {
        return this.http.get(this.getRequestUrl('sort/' + sortText))
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    getAllBySearch(searchText: string): Observable<Task[]> {
        return this.http.get(this.getRequestUrl('search/' + searchText))
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
}
