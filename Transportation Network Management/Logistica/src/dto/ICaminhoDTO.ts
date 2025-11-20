export default interface ICaminhoDTO{
    id: string,
    energiaNecessariaKWh: number;
    tempoDeslocacaoMin: number;
    idArmazemOrigem: string;
    idArmazemDestino: string;
    distanciaEntreArmazens: number;
}