import { Request, Response } from "express";
import { UserModel } from "../db/users";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { log } from "console";

class AuthController {
  register = async (req: Request, res: Response) => {
    try {
      const { password, email, name, pNumber, username } = req.body;
      const salt = 10;
      const hashPassword = await bcrypt.hash(password, salt);

      const userRegistered = await UserModel.findOne({ email });
      if (userRegistered) {
        res.status(400);
        throw new Error("User already exists with this email address");
      }

      const user = new UserModel({
        name: name,
        pNumber: pNumber,
        email: email,
        username: username,
        password: hashPassword,
      }); // Save the instance
      console.log("user data:",user);
      
      const createdUser = await user.save();
      res.status(200).json(createdUser);
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
      console.log("4");
      if (!email || !password) {
        return res.status(400).json("Error Email / password is wrong");
      }
      console.log("3");
      const checkEmail = await UserModel.findOne({ email });

      if (!checkEmail) {
        return res.status(400).json("Error Email / password is wrong");
      }
      console.log("2");
      
      const passwordHashed= await bcrypt.compare(
        password,
        checkEmail.password
      );
      if (!passwordHashed) {
        return res.status(400).json({
          error: "Email/passwrod is wrong!",
        });
      }
      console.log("1");
      
      const user = {
        id: checkEmail.id,
        name: checkEmail.name,
        email: checkEmail.email,
        password: passwordHashed,
        username: checkEmail.username,
        phoneNumber: checkEmail.pNumber,
      };
      
      const token = jwt.sign(user, "lalala", {
        expiresIn: "100000h",
      });
      console.log("token controller ", token);
      
      res.status(200).json({
        user,
        token,
      });
    } catch (e) {
      res.status(400).json({
        message: e.message,
      });
    }
  };

  async check(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;
      console.log("loginsession : " ,loginSession);
      
      const user = await UserModel.findOne({
       _id: loginSession.id

      });
      console.log("user nihh bos", user);
      
      return res.status(200).json({
        user,
        message: "Token is valid",
      });
    } catch (error) {
      return res.status(500).json("Terjadi kesalahan pada server");
    }
  }
}

export default new AuthController();
