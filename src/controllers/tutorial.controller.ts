import { Request, Response } from "express";

import Tutorial, { ITutorial } from "../models/tutorial.model";

export default class TutorialController {
  async create(req: Request, res: Response) {
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    Tutorial.create({
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false,
    })
      .then((data: ITutorial) => {
        res.send(data);
      })
      .catch((error: Error) => {
        res.status(500).send({
          message:
            error.message || "Some error occurred while creating the Tutorial.",
        });
      });
  }

  async findAll(req: Request, res: Response) {
    Tutorial.find()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      });
  }

  async findOne(req: Request, res: Response) {
    const id = req.params.id;

    Tutorial.findById(id)
      .then((data) => {
        if (!data)
          res.status(404).send({ message: "Not found Tutorial with id " + id });
        else res.send(data);
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Error retrieving Tutorial with id=" + id });
      });
  }

  async update(req: Request, res: Response) {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }

    const id = req.params.id;

    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
          });
        } else res.send({ message: "Tutorial was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id,
        });
      });
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;

    Tutorial.findByIdAndDelete(id, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
          });
        } else {
          res.send({
            message: "Tutorial was deleted successfully!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id,
        });
      });
  }

  async deleteAll(req: Request, res: Response) {
    Tutorial.deleteMany({})
      .then((data) => {
        res.send({
          message: `${data.deletedCount} Tutorials were deleted successfully!`,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials.",
        });
      });
  }
}
