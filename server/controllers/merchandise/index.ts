import { Request, Response } from 'express'
import fs from 'fs'
import { Merchandise } from '../../types/Merchandise.types'

const merchandiseDataFile = './data/merchandise.json';
let merchandise: Merchandise[] = JSON.parse(fs.readFileSync(merchandiseDataFile, 'utf-8'));

export const getMerchandise = (req: Request, res: Response) => {
  res.json(merchandise);
}
export const getSingleMerchandise = (req: Request, res: Response) => {
  const {id} = req.params;
  const item = merchandise.find((item) => item.id === parseInt(id));
  if (!item) return res.status(404).json({message: 'Item not found'});
  res.json(item);
}
export const createMerchandise = (req: Request, res: Response) => {
  const newItem = req.body;
  newItem.id = merchandise.length + 1;
  newItem.createdAt = new Date().toISOString();
  newItem.updatedAt = new Date().toISOString();
  merchandise.push(newItem);
  fs.writeFileSync(merchandiseDataFile, JSON.stringify(merchandise, null, 2));
  res.status(201).json(newItem);
}
export const updateMerchandise = (req: Request, res: Response) => {
  const {id} = req.params;
  const updatedItem = req.body;
  const index = merchandise.findIndex((item) => item.id === parseInt(id));
  if (index === -1) return res.status(404).json({message: 'Item not found'});
  const merchandiseData = merchandise.find((item) => item.id === parseInt(id));
  updatedItem.id = parseInt(id);
  updatedItem.updatedAt = new Date().toISOString();
  merchandise[index] = {...merchandiseData, ...updatedItem}
  fs.writeFileSync(merchandiseDataFile, JSON.stringify(merchandise, null, 2));
  res.json(updatedItem);
}
export const deleteMerchandise = (req: Request, res: Response) => {
  const {id} = req.params;
  const index = merchandise.findIndex((item) => item.id === parseInt(id));
  if (index === -1) return res.status(404).json({message: 'Item not found'});
  const deletedItem = merchandise.splice(index, 1);
  fs.writeFileSync(merchandiseDataFile, JSON.stringify(merchandise, null, 2));
  res.json(deletedItem[0]);
}
