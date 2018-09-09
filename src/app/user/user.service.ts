import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { TranslateService } from '../translate.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class UserService {

  private baseUrl = "/api/user/";
  constructor(private http: Http, private translateService: TranslateService) {
  }

  getRequestUrl(str: any) {
    return this.baseUrl + str + "?lang=" + this.translateService.locale;
  }

  getAll(): Observable<User[]> {
    return this.http.get(this.getRequestUrl('list'))
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getById(id: number): Observable<User[]> {
    return this.http.get(this.getRequestUrl(id))
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  create(user: User) {
    return this.http.post(this.getRequestUrl('add'), user)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  update(user: User) {
    return this.http.put(this.getRequestUrl(user.id), user)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  delete(id: number) {
    return this.http.delete(this.getRequestUrl(id))
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getAllBySort(sortText: string): Observable<User[]> {
    return this.http.get(this.getRequestUrl('sort/' + sortText))
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
  
  getAllBySearch(searchText: string): Observable<User[]> {
    return this.http.get(this.getRequestUrl('search/' + searchText))
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
}