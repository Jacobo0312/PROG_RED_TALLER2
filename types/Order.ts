import {User} from './User';

export interface Order{
    id: number
    createDate:number,
    payDate:number,
    paid:boolean
    user:User;
  }