import { Request, Response } from "express";
import Product, { IProduct } from "../models/product.model";

export default class ProductController {
  async create(req: Request, res: Response) {
    try {
      if (req.body.name === undefined || req.body.name === "") {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }

      const product: IProduct = await Product.create({
        ...req.body,
      });

      res.send(product);
    } catch (error) {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating the Product.",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const products: IProduct[] = await Product.find();
      res.send(products);
    } catch (error) {
      res.status(500).send({
        message:
          error.message || "Some error occurred while retrieving Products.",
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const product = await Product.findById(id);

      if (!product)
        res.status(404).send({ message: "Not found Product with id " + id });
      else res.send(product);
    } catch (error) {
      res.status(500).send({
        message: error.message || "Error retrieving Product with id=" + id,
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

      const product = await Product.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false,
      });

      if (!product) {
        res.status(404).send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found!`,
        });
      } else res.send({ message: "Product was updated successfully." });
    } catch (error) {
      res.status(500).send({
        message: error.message || "Error updating Product with id=" + id,
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const product = await Product.findByIdAndDelete(id, {
        useFindAndModify: false,
      });

      if (!product) {
        res.status(404).send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`,
        });
      } else {
        res.send({
          message: "Product was deleted successfully!",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: error.message || "Could not delete Product with id=" + id,
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const products = await Product.deleteMany({});
      res.send({
        message: `${products.deletedCount} Product were deleted successfully!`,
      });
    } catch (error) {
      res.status(500).send({
        message:
          error.message || "Some error occurred while removing all tutorials.",
      });
    }
  }
}
