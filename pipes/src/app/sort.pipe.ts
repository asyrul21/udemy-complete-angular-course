import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false // not recommended
})
export class SortPipe implements PipeTransform {

  transform(value: any, sortBy: string): any {
    if (value.length === 0 || sortBy === '') {
      return value
    }

    console.log('SortBy:', sortBy);

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    return value.sort((a, b) => {
      if (a[sortBy]) {
        let item1 = a[sortBy]
        let item2 = b[sortBy]

        console.log(item1);
        return item1 > item2 ? 1 : ((item1 < item2 ? -1 : 0));
      }
    })
  }
}
