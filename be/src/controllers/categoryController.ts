import { Request, Response } from "express";
import { categoryModel } from "../db/main";

class categoryController {

    category = async (req: Request, res: Response) => {
        try {
          const { description, color } = req.body;
          const create = await categoryModel.create({ description, color });
          console.log(create);
          console.log(description, color);
          const createCategory = await create.save();
          res.status(200).json(createCategory);
        } catch (error) {
          res.status(400);
          throw new Error(error);
        }
      };

      updateCategory = async (req: Request, res: Response) => {
        try {
          const { description, color } = req.body;
          const update = await categoryModel.updateOne({_id: req.params.id},{ $set: { description, color } });
          console.log(update);
          res.status(200).json(update);
        } catch (error) {
          res.status(400);
          throw new Error(error);
        }
      };

      getCategory = async (req: Request, res: Response) => {
        try {
          const { description, color } = req.body;
          const getCategory = await categoryModel.find();
          console.log(getCategory);
          console.log(description, color);
          res.status(200).json(getCategory);
        } catch (error) {
          res.status(400);
          throw new Error(error);
        }
      };

      getCategoryById = async (req: Request, res: Response) => {
        try {
          const { description, color } = req.body;
          const getCategoryById = await categoryModel.findOne({ description, color });
          console.log(getCategoryById);
          console.log(description, color);
          res.status(200).json(getCategoryById);
        } catch (error) {
          res.status(400);
          throw new Error(error);
        }
      };

      deleteCategory = async (req: Request, res: Response) => {
        try {
          const { description, color } = req.body;
          const deleteCategory = await categoryModel.deleteOne({ _id: req.params.id });
          console.log(deleteCategory);
          console.log(description, color);
          res.status(200).json(deleteCategory);
        } catch (error) {
          res.status(400);
          throw new Error(error);
        }
      };
}

export default new categoryController()