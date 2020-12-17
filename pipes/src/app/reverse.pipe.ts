import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: any): any {
    if (value.length === 0) {
      return value
    }
    let arr = value.split('');
    return arr.reverse().join('')
  }
}
