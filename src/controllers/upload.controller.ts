import { Request, Response } from "express";

export default class CategoryController {
  async create(req: Request, res: Response) {
    try {
      if (!req.file) {
        res.status(400).json({ message: "No file uploaded" });
        return;
      }

      const imagePath = req.file.path;
      res.status(200).json({ imagePath: imagePath });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ message: "Error uploading image" });
    }
  }
}
