
export interface ICaminhoPersistence{
    _id: string;
    energiaNecessariaKWh: number;
    tempoDeslocacaoMin: number;
    idArmazemOrigem: string;
    idArmazemDestino: string;
    distanciaEntreArmazens: number;
}