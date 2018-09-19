import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from './task';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { TranslateService } from '../translate.service';
import { Project } from '../project/project';

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
        if (task.parentTask && task.parentTask.id == null) {
            task.parentTask = null;
        }
        return this.http.post(this.getRequestUrl('add'), task)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    update(task: Task) {
        if (task.parentTask && task.parentTask.id == null) {
            task.parentTask = null;
        }
        return this.http.put(this.getRequestUrl(task.id), task)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    delete(id: number) {
        return this.http.delete(this.getRequestUrl(id))
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    getAllBySort(sortText: string, project: Project): Observable<Task[]> {
        let url = this.getRequestUrl('sort/' + sortText);
        if (project && project.id != null) {
            url = this.getRequestUrl('sort/' + project.id + "/" + sortText);
        }
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    getAllBySearch(searchText: string): Observable<Task[]> {
        return this.http.get(this.getRequestUrl('search/' + searchText))
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    getTasksByProject(id: number) {
        return this.http.get(this.getRequestUrl('list/project/' + id))
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
}