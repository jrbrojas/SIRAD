import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    const guess = moment.utc(value).tz(moment.tz.guess());
    return guess.format('DD/MM/YYYY HH:mm:ss');

    //const localtz = moment.tz.guess()
    //return moment(value).format('DD/MM/YYYY HH:mm:ss', localtz);
  }

}
