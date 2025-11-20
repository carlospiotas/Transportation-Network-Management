import { IPlanoEntregaPersistence } from '../../dataschema/IPlanoEntregaPersistence';
import mongoose from 'mongoose';

const PlanoEntregaSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    camiaoMatricula: { type: String, unique: false },
    caminho: { type: Array<String>, unique: false },
    data: {
      type: Date, 
      index: true
    },
    entregas:{ type: Array<String>, unique: false },

  },
  {
    timestamps: true
  }


);

//Não permite que existam 2 Caminhos com a Origem e o Destino iguais
PlanoEntregaSchema.index({ data: 1, camiaoMatricula: 1 }, { unique: true });

export default mongoose.model<IPlanoEntregaPersistence & mongoose.Document>('PlanoEntrega', PlanoEntregaSchema);
