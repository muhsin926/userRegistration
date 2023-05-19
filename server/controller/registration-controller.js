import mongoose, { set } from "mongoose";
import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const user = await new userModel({ ...req.body }).save();
    res.json({ status: true, id: user?.id });
  } catch (err) {
    res.json({ status: false, err: err });
  }
};

export const getById = async (req, res) => {
  const { userId } = req.query;
  const objectId = new mongoose.Types.ObjectId(userId);
  try {
    const user = await userModel.findOne({ _id: objectId });
    res.json({ status: true, user });
  } catch (err) {
    res.json({ status: false, err });
  }
};

export const removeAccount = async (req, res) => {
  const { userId } = req.query;
  try {
    await userModel.deleteOne({ _id: userId });
    res.json({ status: true });
  } catch (err) {
    res.json({ err });
  }
};

export const update = async (req, res) => {
  const { userId } = req.query;
  console.log(req.body);
  try {
    await userModel.updateOne({ _id: userId }, { ...req.body });
    res.json({ status: true });
  } catch (err) {
    res.json({ err });
  }
};
