import { Repo } from "../../core/infra/Repo";
import { Camiao } from "../../domain/camiao/camiao";
import { CamiaoId } from "../../domain/camiao/camiaoId";
import { CamiaoMatricula } from "../../domain/camiao/camiaoMatricula";

export default interface ICamiaoRepo extends Repo<Camiao> {
	save(camiao: Camiao): Promise<Camiao>;
	findById (camiaoId: CamiaoId | String): Promise<Camiao>;
	getByMatricula (matricula: CamiaoMatricula |String): Promise<Camiao>;
	getAll(): Promise<Array<Camiao>>;
	getCamioesInibidos(): Promise<Array<Camiao>>;
	deleteById(id:  string): Promise<Camiao>;
	deleteByMatricula(matricula:  string): Promise<Camiao>;
	softDeleteCamiao(matricula: string): Promise<Camiao>;
	restoreSoftDeleteCamiao(matricula: string):Promise<Camiao>;
}
  