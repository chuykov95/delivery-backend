import { Request, Response } from "express";
import Category, { ICategory } from "../models/category.model";

export default class CategoryController {
  async create(req: Request, res: Response) {
    try {
      if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }

      const category: ICategory = await Category.create({
        name: req.body.name,
        parentId: req.body.parentId,
      });

      res.send(category);
    } catch (error) {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating the Tutorial.",
      });
    }
  }
}
