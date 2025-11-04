import { Request, Response } from "express";
import * as wineService from "../services/wine.service";
import Joi from "joi";

export const wineBodySchema = Joi.object({
  name: Joi.string().min(1).required(),
  varietal: Joi.string().optional(),
  vintage: Joi.number().integer().optional(),
  region: Joi.string().optional(),
}).required();

export const getAll = async (_req: Request, res: Response) => {
  const wines = await wineService.list();
  res.json(wines);
};

export const getOne = async (req: Request, res: Response) => {
  const wine = await wineService.get(Number(req.params.id));
  if (!wine) return res.status(404).json({ message: "Not found" });
  res.json(wine);
};

export const create = async (req: Request, res: Response) => {
  const wine = await wineService.create(req.body); // req.body는 미들웨어에서 sanitize됨
  res.status(201).json(wine);
};

export const remove = async (req: Request, res: Response) => {
  await wineService.remove(Number(req.params.id));
  res.status(204).end();
};
