import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from './project';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { TranslateService } from '../translate.service';

@Injectable()
export class ProjectService {
    private baseUrl = "/api/project/";
    constructor(private http: Http, private translateService: TranslateService) { }

    getRequestUrl(endpoint: any) {
        return this.baseUrl + endpoint + "?lang=" + this.translateService.getLocale();
    }

    getAll(): Observable<Project[]> {
        return this.http.get(this.getRequestUrl('list'))
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    getById(id: number): Observable<Project[]> {
        return this.http.get(this.getRequestUrl(id))
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    create(project: Project) {
        return this.http.post(this.getRequestUrl('add'), project)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    update(project: Project) {
        return this.http.put(this.getRequestUrl(project.id), project)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    delete(id: number) {
        return this.http.delete(this.getRequestUrl(id))
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    getAllBySort(sortText: string): Observable<Project[]> {
        return this.http.get(this.getRequestUrl('sort/' + sortText))
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    getAllBySearch(searchText: string): Observable<Project[]> {
        return this.http.get(this.getRequestUrl('search/' + searchText))
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
}

