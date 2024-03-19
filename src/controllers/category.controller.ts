import { Request, Response } from "express";
import Category, { ICategory } from "../models/category.model";

export default class CategoryController {
  async create(req: Request, res: Response) {
    try {
      if (req.body.name === undefined || req.body.name === "") {
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
          error.message || "Some error occurred while creating the Category.",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const categories: ICategory[] = await Category.find().lean();
      res.send(categories);
    } catch (error) {
      res.status(500).send({
        message:
          error.message || "Some error occurred while retrieving categories.",
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const category = await Category.findById(id).lean();

      if (!category)
        res.status(404).send({ message: "Not found Category with id " + id });
      else res.send(category);
    } catch (error) {
      res.status(500).send({
        message: error.message || "Error retrieving Category with id=" + id,
      });
    }
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;

    try {
      if (req.body.name === undefined || req.body.name === "") {
        res.status(400).send({
          message: "Data to update can not be empty!",
        });
        return;
      }

      const category = await Category.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false,
      }).lean();

      if (!category) {
        res.status(404).send({
          message: `Cannot update Category with id=${id}. Maybe Category was not found!`,
        });
      } else res.send({ message: "Category was updated successfully." });
    } catch (error) {
      res.status(500).send({
        message: error.message || "Error updating Category with id=" + id,
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const category = await Category.findByIdAndDelete(id, {
        useFindAndModify: false,
      }).lean();

      if (!category) {
        res.status(404).send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`,
        });
      } else {
        res.send({
          message: "Category was deleted successfully!",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: error.message || "Could not delete Category with id=" + id,
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const categories = await Category.deleteMany({}).lean();
      res.send({
        message: `${categories.deletedCount} Category were deleted successfully!`,
      });
    } catch (error) {
      res.status(500).send({
        message:
          error.message || "Some error occurred while removing all tutorials.",
      });
    }
  }
}
