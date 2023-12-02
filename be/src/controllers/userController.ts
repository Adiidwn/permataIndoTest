import { Request, Response } from "express";
import { UserModel } from "../db/users";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

class AuthController {
  register = async (req: Request, res: Response) => {
    try {
      const { password, email, name, phoneNumber, username } = req.body;
      const salt = 10;
      const hashPassword = await bcrypt.hash(password, salt);

      const userRegistered = await UserModel.findOne({ email });
      if (userRegistered) {
        res.status(400);
        throw new Error("User already exists with this email address");
      }

      const user = await UserModel.create({
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        username: username,
        password: hashPassword,
      }); // Save the instance
      const createdUser = await user.save();
      res.status(200).json(user);
    } catch (e) {
      res.status(400).json({
        message: Error,
      });
    }
  };

  getUsers = async (req: Request, res: Response) => {
    try {
      const users = await UserModel.find();
      res.status(200).json(users);
    } catch (e) {
      res.status(400).json({
        message: Error,
      });
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const users = await UserModel.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(users);
    } catch (e) {
      res.status(400).json({
        message: Error,
      });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const {email, password} = req.body
      if (!email || !password) {
        return res.status(400).json("Error Email / password is wrong");
      }

      const checkEmail = await UserModel.findOne({ email });

      if (!checkEmail) {
        return res.status(400).json("Error Email / password is wrong");
      }

      const passwordHashed= await bcrypt.compare(
        password,
        checkEmail.password
      );
      if (!passwordHashed) {
        return res.status(400).json({
          error: "Email/passwrod is wrong!",
        });
      }
      const user = {
        id: checkEmail.id,
        name: checkEmail.name,
        email: checkEmail.email,
        password: passwordHashed,
        username: checkEmail.username,
        phoneNumber: checkEmail.phoneNumber,
      };
      
      const token = jwt.sign(user, "lalala", {
        expiresIn: "100000h",
      });

      res.status(200).json({
        user,
        token,
      });
    } catch (e) {
      res.status(400).json({
        message: Error,
      });
    }
  };
}

export default new AuthController();
