import {Request, Response} from 'express';
import {Position} from '../models/Position';
import {errorHandler} from '../utils/errorHandler';
import {PositionReq} from '../interfaces/ajax';



export async function getByCategoryId(request: Request, res: Response): Promise<void> {
  const req = request as PositionReq;
  try {
    const position = await Position.find({
      category: +req.params.id,
      user: +req.user.id
    });
    res.status(200).json(position)
  } catch (e) {
    errorHandler(res, e)
  }
}

export async function create(request: Request, res: Response): Promise<void> {
  const req = request as PositionReq;
  try {
    const position = await new Position({
      name: req.body.name,
      cost: req.body.cost,
      category: req.body.category,
      user: req.user.id
    }).save();
    res.status(201).json(position)
  } catch (e) {
    errorHandler(res, e)
  }
}

export async function remove(request: Request, res: Response): Promise<void> {
  const req = request as PositionReq;
  try {
    await Position.remove({_id: req.params.id});
    res.status(200).json({
      message: 'Позиция удалена'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

export async function update(request: Request, res: Response): Promise<void> {
  const req = request as PositionReq;
  try {
    const position = await Position.findOneAndUpdate({_id: req.params.id},
      {$set: req.body},
      {new: true});
    res.status(200).json(position)
  } catch (e) {
    errorHandler(res, e)
  }
}
