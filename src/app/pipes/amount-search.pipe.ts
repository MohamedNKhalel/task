import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../interfaces/data';

@Pipe({
  name: 'amountSearch'
})
export class AmountSearchPipe implements PipeTransform {

  transform(transaction: Transaction[], word:string): Transaction[] {
    return transaction.filter(m=>m.amount.toFixed().includes(word.toLowerCase()))
  }

}
