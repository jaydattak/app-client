import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  data : any = {};
  locale : string = 'en'; 

  constructor(private http : HttpClient) {

   }

   getLocale() {
     return this.locale;
   }

   setLanguageForProperty(language : string) : Promise<{}>{
     return new Promise<{}> ((resolve, reject) =>
     {
       const propertyPath = `assets/${language || 'en'}.json`;
 
       this.http.get<{}>(propertyPath).subscribe(
         translation => {
           this.data = Object.assign({}, translation || {});
           resolve(this.data); 
           this.locale = language;          
         },
         error => {
           this.data = {};
           resolve(this.data);
         }
       )

    });
   }
}
