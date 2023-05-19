import mongoose from "mongoose";

const serv = () => {
  mongoose
    .connect("mongodb://localhost:27017/meachine-task")
    .then(() => {
      console.log("Mongoose connected");
    })
    .catch(console.error);
};

export default serv;
