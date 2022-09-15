import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
  name: 'total',
} )
export class TotalPipe implements PipeTransform {
  transform( value: number, nominal: number, price: number) {
    return ((value / price) * nominal).toFixed(2);
  }
}
