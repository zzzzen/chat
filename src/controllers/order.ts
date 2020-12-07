import {Request, Response} from 'express';
import {Order} from '../models/Order';
import {errorHandler} from '../utils/errorHandler';
import {OrderSearchReq, OrderCreateReq} from '../interfaces/ajax';


export async function getAll(request: Request, res: Response): Promise<void> {
  const req = request as OrderSearchReq;

  const query: any = {
    user: req.user.id
  };

  if (req.query.start) {
    query.date = {
      $gte: req.query.start
    }
  }

  if (req.query.end) {
    if (!query.date) {
      query.date = {}
    }
    query.date['$lte'] = req.query.end
  }

  if (req.query.order) {
    query.order = Number(req.query.order)
  }

  try {
    const orders = await Order
      .find(query)
      .sort({date: -1})
      .skip(Number(req.query.offset))
      .limit(Number(req.query.limit));
    res.status(200).json(orders)
  } catch (e) {
    errorHandler(res, e)
  }
}

export async function create(request: Request, res: Response): Promise<void> {
  const req = request as OrderCreateReq;

  try {
    const lastOrder = await Order
      .findOne({user: req.user.id})
      .sort({date: -1});
    const maxOrder: any = lastOrder ? lastOrder : 0;
    const order = await new Order({
      list: req.body.list,
      user: req.user.id,
      order: maxOrder + 1
    }).save();
    res.status(201).json(order)
  } catch (e) {
    errorHandler(res, e)
  }
}
