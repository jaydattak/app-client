import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { TranslateService } from '../../translate.service';
import { ParentTask } from './parent-task';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ParentTaskService {

  private baseUrl = "/api/parenttask/";
  constructor(private http: Http, private translateService: TranslateService) {
  }

  getRequestUrl(str: any) {
    return this.baseUrl + str + "?lang=" + this.translateService.locale;
  }

  getAll(): Observable<ParentTask[]> {
    return this.http.get(this.getRequestUrl('list'))
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getAllBySearch(searchText: string): Observable<ParentTask[]> {
    return this.http.get(this.getRequestUrl('search/' + searchText))
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  create(task: ParentTask) {
    return this.http.post(this.getRequestUrl('add'), task)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
}