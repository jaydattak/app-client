import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from "./translate.service";
@Pipe({
  name: 'translate',
  pure : false
})
export class TranslatePipe implements PipeTransform {

  constructor(private service : TranslateService){

  }

  transform(key: any): any {
    return this.service.data[key] || key;
  }

}
