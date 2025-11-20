import { ICamiaoPersistence } from '../../dataschema/ICamiaoPersistence';
import mongoose from 'mongoose';
import { softDeletePlugin, ISoftDeletedModel, ISoftDeletedDocument } from 'mongoose-softdelete-typescript';

const CamiaoSchema = new mongoose.Schema(
  {
    domainId: { 
      type: String,
      unique: true
    },

    matricula: {
      type: String,
      unique: true,
      index: true
    },

    tara: {
      type: String,
      unique: false,
      min: 0
    },

    capacidadeCarga: {
      type: String,
      unique: false,
      min: 0
    },

    cargaTotalBaterias: {
      type: String,
      unique: false
    },

    autonomia: {
      type: String,
      unique: false
    },

    tempoRecarregamento: {
      type: String,
      unique: false
    },
  },
  { timestamps: true },
);

CamiaoSchema.plugin(softDeletePlugin);
//export default mongoose.model<ICamiaoPersistence & mongoose.Document>('Camiao', CamiaoSchema);
export default mongoose.model<ISoftDeletedDocument, ISoftDeletedModel<ISoftDeletedDocument>>('Camiao', CamiaoSchema);