import { ICaminhoPersistence } from '../../dataschema/ICaminhoPersistence';
import mongoose from 'mongoose';

const CaminhoSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    energiaNecessariaKWh: { type: String, unique: false },
    tempoDeslocacaoMin: { type: String, unique: false },
    idArmazemOrigem: {
      type: String, 
      index: true
    },
    idArmazemDestino: { 
      type: String,
      index: true},
    distanciaEntreArmazens: { type: String, unique: false }

  },
  {
    timestamps: true
  }


);

//Não permite que existam 2 Caminhos com a Origem e o Destino iguais
CaminhoSchema.index({ idArmazemOrigem: 1, idArmazemDestino: 1 }, { unique: true });

export default mongoose.model<ICaminhoPersistence & mongoose.Document>('Caminho', CaminhoSchema);
