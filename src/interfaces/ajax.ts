import {Request} from 'express';
import {Schema} from 'mongoose';

export interface OrderSearchReq extends Request {
  user: {
    id: any;
  };
  query: {
    start: string;
    end: string;
    order: string;
    offset: string;
    limit: string;
  };
}

export interface OrderCreateReq extends Request {
  user: {
    id: any;
  };
  query: {
    start: string;
    end: string;
    order: string;
    offset: string;
    limit: string;
  };
}

export interface LoginReq extends Request {
  body: {
    email: string;
    password: string;
  };
}

export interface PositionReq extends Request {
  params: {
    id: string;
  };
  user: {
    id: string;
  };
  body: {
    name: string;
    cost: number;
    category: Schema.Types.ObjectId;
  };
}

export interface CategoryReq extends Request {
  params: {
    id: string;
  };
  user: {
    id: string;
  };
  body: {
    name: string;
  };
}
