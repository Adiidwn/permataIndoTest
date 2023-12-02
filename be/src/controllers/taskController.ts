import { Request, Response } from "express";
import { categoryModel, taskModel } from "../db/main";

class MainController {
  task = async (req: Request, res: Response) => {
    try {
      const { description, status } = req.body;
      const create = await taskModel.create({ description, status });
      console.log(create);
      console.log(description, status);
      const createTask = await create.save();
      res.status(200).json(createTask);
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }
  };

  deleteTask = async (req: Request, res: Response) => {
    try {
      const { description, status } = req.body;
      const deleteTask = await taskModel.deleteOne({ _id: req.params.id });
      console.log(deleteTask);
      res.status(200).json(deleteTask);
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }
  };

  updateTask = async (req: Request, res: Response) => {
    try {
      const { description, status } = req.body;
      const update = await taskModel.updateOne({_id: req.params.id},{
        description,
        status,
      });
      console.log(update);
      res.status(200).json(update);
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }
  };

  getTask = async (req: Request, res: Response) => {
    try {
      const tasks = await taskModel.find();
      res.status(200).json(tasks);
    } catch (e) {
      res.status(400).json({
        message: Error,
      });
    }
  };

  getTaskById = async (req: Request, res: Response) => {
    try {
      const task = await taskModel.findOne({
        _id: req.params.id,
      });
      res.status(200).json(task);
    } catch (e) {
      res.status(400).json({
        message: Error,
      });
    }
  };

 
}

export default new MainController();
