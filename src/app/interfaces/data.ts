export interface Data {
    customers: Customer[]
    transactions: Transaction[]
}

export interface Customer {
    id: number
    name: string
    totalAmount:number
}

export interface Transaction {
    id: number
    customer_id: number
    date: string
    amount: number
    name:string
    }
