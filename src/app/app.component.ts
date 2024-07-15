import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from './services/data.service';
// import { Chart,registerables } from 'chart.js';
import { Customer, Transaction } from './interfaces/data';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'jobTask';
  // @ViewChild('myChart') myChartRef!: ElementRef;
  constructor(private _DataService:DataService){}
  
  myChart: any;
  customers!:Customer[];
  transactions!:Transaction[];
  CustomerTotalAmount:any[] =[];
  customerName:string = '';
  customerId!:number 
  transactionName:string = '';
  transactionAmount:string = '';
  transactionsPerDay:object ={}
  amount:any[]=[]
  date:any[]= []
  ngOnInit(): void {
    this.getData()
    this.renderChart()
  }
  getData(){
    this._DataService.getAllData().subscribe({
      next:data=>{
        this.customers = data;
        console.log(data);
      },
      error:err=>{
        console.log(err);
        
      }
    })
    this._DataService.getSpecificData().subscribe({
      next:data=>{
        this.transactions = data
        console.log(this.transactions); 
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }
  getTransactionData(id:any){
    this._DataService.getTransactionOfDay().subscribe(data=>{
      console.log(data.transactions[id]);
      this.amount.push(data.transactions[id].amount) ;
      this.date.push(data.transactions[id].date) ;
      console.log(this.amount , this.date);
      this.renderChart(this.amount , this.date)
    })
  }
  renderChart(amount:any[] = [1200],date:any[] = ['2024-07-05']){
    if (this.myChart) {
      this.myChart.destroy();
      this.amount = []
      this.date = []
    }
    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: date,
        datasets: [{
          label: ' total transaction amount per day',
          data: amount,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
}
