import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'; 
@Pipe({
  name: 'dateTransform'
})
export class DateTransformPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return moment(value).format('DD.MM.YYYY, HH:mm');
  }

}