import { ProductOrder } from './ProductOrder';
import {User} from './User';

export interface Order{
    id: string
    createDate:number,
    payDate:number,
    paid:boolean
    user:User;
    products:ProductOrder[];
    
  }