import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _HttpClient:HttpClient) { }

  apiUrl:string = `assets/data.json`
  mainUrl:string = `http://localhost:3000/`
  getAllData():Observable<any>
  {
    return this._HttpClient.get<any>(this.apiUrl).pipe(
      map(data => {
        return data.customers.map((customer:any) => {
          const customerTransactions = data.transactions.filter((transaction:any) => transaction.customer_id === customer.id);
          const totalAmount = customerTransactions.reduce((acc:any, transaction:any) => acc + transaction.amount, 0);
          return {
            id: customer.id,
            name: customer.name,
            totalAmount: totalAmount,
          };
        });
      })
    );
  }
  getSpecificData():Observable<any>
  {
    return this._HttpClient.get<any>(this.apiUrl).pipe(
      map(data=>{
        return data.transactions.map((transaction:any)=>{
          const customer = data.customers.filter((customer:any)=>customer.id === transaction.customer_id);
          const customerName = customer.reduce((acc:any , customer:any)=> customer.name , '')
          return{
            id:transaction.id,
            customer_id:transaction.customer_id,
            name:customerName,
            date:transaction.date,
            amount:transaction.amount,
          }
        })
      })
    )
  }
  getTransactionsPerDay(customerId: number): Observable<any[]> {
    return this._HttpClient.get<any>(this.apiUrl).pipe(
      map(data => {
        const customerTransactions = data.transactions.filter((transaction:any) => transaction.customer_id === customerId);
        const transactionsPerDay:any = {};

        customerTransactions.forEach((transaction:any) => {
          const date = transaction.date;
          if (!transactionsPerDay[date]) {
            transactionsPerDay[date] = 0;
          }
          transactionsPerDay[date] += transaction.amount;
        });

        // Convert object to array for Chart.js compatibility
        return Object.keys(transactionsPerDay).map(date => {
          return {
            date: date,
            amount: transactionsPerDay[date]
          };
        });
      })
    );
  }
  getTransactionOfDay():Observable<any>
  {
    return this._HttpClient.get<any>(this.apiUrl)
  }
  }

