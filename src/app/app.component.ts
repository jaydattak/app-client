import { Component } from '@angular/core';
import { TranslateService} from "./translate.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-client';
  constructor(private translateService : TranslateService ){

  }

  setLocale(lang: string){
    this.translateService.setLanguageForProperty(lang);
  }
}
