import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(date: string): any {
    const splitDate = date.split('-');
    const newDate = new Date(
      Number(splitDate[0]),
      Number(splitDate[1]),
      Number(splitDate[2]),
      0,
      0,
      0,
    );
    newDate.setMonth(newDate.getMonth() - 1);
    date = formatDate(
      newDate,
      'dd MMM yyyy',
      'en-US'
    );
    return date;
  }

}
