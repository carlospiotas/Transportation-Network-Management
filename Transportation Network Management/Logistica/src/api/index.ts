import { Router } from 'express';
import caminho from './routes/caminhoRoute';
import camiao from './routes/camiaoRoute';
import planoEntregas from './routes/planoEntregasRoute';

export default () => {
	const app = Router();

	caminho(app);
	camiao(app);
	planoEntregas(app);

	return app
}

