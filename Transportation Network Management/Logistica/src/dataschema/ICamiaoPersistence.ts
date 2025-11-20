import mongoose from "mongoose";

export interface ICamiaoPersistence extends mongoose.Document {
	_id: string;
  matricula: string;
  tara: number;
  capacidadeCarga: number;
  cargaTotalBaterias: number;
  autonomia: number;
  tempoRecarregamento: number;
}