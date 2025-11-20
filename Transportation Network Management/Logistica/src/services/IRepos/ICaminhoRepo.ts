import { Repo } from "../../core/infra/Repo";
import { Caminho } from "../../domain/caminho/Caminho";
import { caminhoId } from "../../domain/caminho/caminhoId";
import { CaminhoDistanciaArmazens } from "../../domain/caminho/CaminhoDistanciaArmazens";

export default interface ICaminhoRepo extends Repo<Caminho> {
	save(user: Caminho): Promise<Caminho>;
	findByDomainId(caminhoId: caminhoId | string): Promise<Caminho>;
	listarTodosCaminhos(): Promise<Array<Caminho>>;
	listarPorIdArmazemOrigem(idArmazemOrigem: string): Promise<Array<Caminho>>;
	listarPorIdArmazemDestino(idArmazemDestino: string): Promise<Array<Caminho>>;
	deleteById(id: string): Promise<Caminho>;
	listarTodosCaminhosPaginacao(pagina: number): Promise<Array<Caminho>>;
	listarPorIdArmazemOrigemPaginacao(idArmazemOrigem: string, pagina: number): Promise<Array<Caminho>>;
	listarPorIdArmazemDestinoPaginacao(idArmazemDestino: string, pagina: number): Promise<Array<Caminho>>;
}
