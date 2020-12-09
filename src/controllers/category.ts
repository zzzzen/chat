import {Response, Request} from "express";
import {Category} from "../models/Category";
import {errorHandler} from "../utils/errorHandler";
import {CategoryReq} from "../interfaces/ajax";


export function getAll(request: Request, res: Response): void {
  const req = request as CategoryReq;
  res.json({
    message: "Categories"
  });
}

export function getById(request: Request, res: Response): void {
  console.log(request, res);
}

export function remove(request: Request, res: Response): void {
  console.log(request, res);
}

export async function create(request: Request, res: Response): Promise<void> {
  const req = request as CategoryReq;
  try {
    const category = await new Category({
      name: req.body.name,
      user: req.user.id,
      imageSrc: req.file ? req.file.path : ""
    }).save();
    res.status(201).json(category);
  } catch (e) {
    errorHandler(res, e);
  }
}

export async function update(request: Request, res: Response): Promise<void> {
  const req = request as CategoryReq;
  const updated: any = {
    name: req.body.name
  };
  if (req.file) {
    updated.imageSrc = req.file.path;
  }
  try {
    const category = await Category.findOneAndUpdate({_id: req.params.id},
      {$set: updated},
      {new: true});
    res.status(200).json(category);
  } catch (e) {
    errorHandler(res, e);
  }
}
