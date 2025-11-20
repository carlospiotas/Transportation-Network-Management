import mongoose, { Date } from "mongoose";

export interface IPlanoEntregaPersistence extends mongoose.Document {
    _id: string;
  camiaoMatricula: string;
  caminho: string[];
  date: string;
  entregas: string[];
}