import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../interfaces/data';


@Pipe({
  name: 'nameSearch'
})
export class NameSearchPipe implements PipeTransform {

  transform(customers:any[],word:string): any[] {
    return customers.filter(customer=>customer.name.toLowerCase().includes(word.toLowerCase())) 
  }

}

