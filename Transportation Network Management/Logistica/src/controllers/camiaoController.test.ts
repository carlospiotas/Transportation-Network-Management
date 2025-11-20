import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../config";

import { Result } from '../core/logic/Result';

import ICamiaoDTO from '../dto/ICamiaoDTO';
import CamiaoController from './camiaoController';
import ICamiaoService from '../services/IServices/ICamiaoService';
import console from 'console';

describe('camiao controller', function () {
    beforeEach(function () {
    });

    it('createCamiao: returns json with id+name values', async function () {
        let body = {
            matricula: 'AA-11-BB',
            tara: 200,
            capacidadeCarga: 100,
            cargaTotalBaterias: 20,
            autonomia: 15,
            tempoRecarregamento: 20,

        };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let camiaoServiceClass = require(config.services.camiao.path).default;
        let camiaoServiceInstance = Container.get(camiaoServiceClass)
        Container.set(config.services.camiao.name, camiaoServiceInstance);

        camiaoServiceClass = Container.get(config.services.camiao.name);
        const mock = sinon.stub(camiaoServiceClass, 'createCamiao').returns(
            Result.ok<ICamiaoDTO>({
                id: req.body.id, // ISTO TAVA A DAR CONFLITO por causa do id que existe num lado e nao no outro.
                matricula: req.body.matricula,
                tara: req.body.tara,
                capacidadeCarga: req.body.capacidadeCarga,
                cargaTotalBaterias: req.body.cargaTotalBaterias,
                autonomia: req.body.autonomia,
                tempoRecarregamento: req.body.tempoRecarregamento,
            }),
        );

        const ctrl = new CamiaoController(camiaoServiceClass as ICamiaoService);

        await ctrl.createCamiao(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(
            mock,
            sinon.match({
                matricula: req.body.matricula,
                tara: req.body.tara,
                capacidadeCarga: req.body.capacidadeCarga,
                cargaTotalBaterias: req.body.cargaTotalBaterias,
                autonomia: req.body.autonomia,
                tempoRecarregamento: req.body.tempoRecarregamento,
            })
        );
        mock.restore();
    });

    it('GetAllCamioes: returns json with the values of Camiao using getAll', async function () {
        let body1 = {
            id: "rgrgrg",
            matricula: "ER-21-AA",
            tara: 20,
            capacidadeCarga: 500,
            cargaTotalBaterias: 2123,
            autonomia: 114,
            tempoRecarregamento: 67
        }
        let req1: Partial<Request> = {};
        req1.body = body1;

        let res1: Partial<Response> = {
        };

        let req2: Partial<Request> = {};
        req2.body = "";

        let res2: Partial<Response> = {
            json: sinon.spy()
        };

        let next: Partial<NextFunction> = () => { };


        let camiaoSchemaInstance = require("../persistence/schemas/camiaoSchema").default;
        Container.set("camiaoSchema", camiaoSchemaInstance);

        let camiaoRepoClass = require("../repos/camiaoRepo").default;
        let camiaoRepoInstance = Container.get(camiaoRepoClass);
        Container.set("camiaoRepo", camiaoRepoInstance);

        let camiaoServiceClass = require("../services/camiaoService").default;
        let camiaoServiceInstance = Container.get(camiaoServiceClass);
        Container.set("camiaoService", camiaoServiceInstance);

        camiaoServiceInstance = Container.get("camiaoService");
        const mock = sinon.stub(camiaoServiceInstance, "getAll").returns(Result.ok<ICamiaoDTO[]>([{
            id: "rgrgrg", matricula: "ER-21-AA",
            tara: 20,
            capacidadeCarga: 500,
            cargaTotalBaterias: 2123,
            autonomia: 114,
            tempoRecarregamento: 67
        }]));

        const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

        await ctrl.getAll(<Request>req2, <Response>res2, <NextFunction>next);


        /*sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock, sinon.match({"matricula": "ER-21-AA",
        "tara": 20,
        "capacidade": 500,
        "cargaBateria": 2123,
        "autonomia": 114,
        "tempoCarregamentoRapido": 67}));
        /*const expected = [body1];
        console.log("1");
        console.log(result);*/
        //sinon.assert.match(body1, res2);
        sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock,);

        mock.restore();
    })

    it('returns json with the values of Camiao using GetByMatricula', async function () {
        let body1 = {
            id: "12345678",
            matricula: "ER-21-AA",
            tara: 20,
            capacidadeCarga: 500,
            cargaTotalBaterias: 2123,
            autonomia: 114,
            tempoRecarregamento: 67
        }

        let body2 = {
            matricula: "BB-21-AA",
            tara: 20,
            capacidadeCarga: 500,
            cargaTotalBaterias: 2123,
            autonomia: 114,
            tempoRecarregamento: 67
        }

        let req1: Partial<Request> = {};
        req1.body = body1;

        let req2: Partial<Request> = {};
        req2.body = body2;

        let req3: Partial<Request> = {};

        let param = {
            "matricula": "ER-21-AA"
        }

        req3.params = param;


        let res1: Partial<Response> = {};

        let res2: Partial<Response> = {};

        let res3: Partial<Response> = {
            json: sinon.spy()
        };

        let next: Partial<NextFunction> = () => { };


        let camiaoSchemaInstance = require("../persistence/schemas/camiaoSchema").default;
        Container.set("camiaoSchema", camiaoSchemaInstance);

        let camiaoRepoClass = require("../repos/camiaoRepo").default;
        let camiaoRepoInstance = Container.get(camiaoRepoClass);
        Container.set(config.repos.camiao.name, camiaoRepoInstance);

        let camiaoServiceClass = require("../services/camiaoService").default;
        let camiaoServiceInstance = Container.get(camiaoServiceClass);
        Container.set(config.services.camiao.name, camiaoServiceInstance);

        camiaoServiceInstance = Container.get("camiaoService");
        const mock = sinon.stub(camiaoServiceInstance, "getByMatricula").returns(Result.ok<ICamiaoDTO>({
            id: req1.body.id, matricula: req1.body.matricula,
            tara: req1.body.tara,
            capacidadeCarga: req1.body.capacidadeCarga,
            cargaTotalBaterias: req1.body.cargaTotalBaterias,
            autonomia: req1.body.autonomia,
            tempoRecarregamento: req1.body.tempoRecarregamento
        }));

        const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

        //await ctrl.createCamiao(<Request>req1, <Response>res1, <NextFunction>next);
        //await ctrl.createCamiao(<Request>req2, <Response>res2, <NextFunction>next);
        const result = await ctrl.getByMatricula(<Request>req3, <Response>res3, <NextFunction>next);


        sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock, sinon.match("ER-21-AA"));

        mock.restore();
    })

    it('returns json with the new values of Camiao using updateCamiao', async function () {
        let body = {
            id: "12345678",
            matricula: "BB-21-AA",
            tara: 20,
            capacidadeCarga: 500,
            cargaTotalBaterias: 2123,
            autonomia: 114,
            tempoRecarregamento: 67
        };
        let req: Partial<Request> = {};
        req.body = body;
        let param = {
            id: "12345678"
        }
        req.params = param;

        let res: Partial<Response> = {};

        let body2 = {
            id: "12345678",
            matricula: "BB-21-AA",
            tara: 45,
            capacidadeCarga: 70,
            cargaTotalBaterias: 2123,
            autonomia: 114,
            tempoRecarregamento: 67
        };
        let req2: Partial<Request> = {};
        req2.body = body2;
        req2.params = param;

        let res2: Partial<Response> = {
            json: sinon.spy()
        };

        let next: Partial<NextFunction> = () => { };


        let camiaoSchemaInstance = require("../persistence/schemas/camiaoSchema").default;
        Container.set("camiaoSchema", camiaoSchemaInstance);

        let camiaoRepoClass = require("../repos/camiaoRepo").default;
        let camiaoRepoInstance = Container.get(camiaoRepoClass);
        Container.set(config.repos.camiao.name, camiaoRepoInstance);

        let camiaoServiceClass = require("../services/camiaoService").default;
        let camiaoServiceInstance = Container.get(camiaoServiceClass);
        Container.set(config.services.camiao.name, camiaoServiceInstance);

        camiaoServiceInstance = Container.get("camiaoService");
        const mock = sinon.stub(camiaoServiceInstance, "updateCamiao").returns(Result.ok<ICamiaoDTO>({
            id: req2.body.id, matricula: req2.body.matricula,
            tara: req2.body.tara,
            capacidadeCarga: req2.body.capacidadeCarga,
            cargaTotalBaterias: req2.body.cargaTotalBaterias,
            autonomia: req2.body.autonomia,
            tempoRecarregamento: req2.body.tempoRecarregamento
        }));


        const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

        await ctrl.updateCamiao(<Request>req2, <Response>res2, <NextFunction>next);

        sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock, sinon.match({
            id: req2.body.id, matricula: req2.body.matricula,
            tara: req2.body.tara,
            capacidadeCarga: req2.body.capacidadeCarga,
            cargaTotalBaterias: req2.body.cargaTotalBaterias,
            autonomia: req2.body.autonomia,
            tempoRecarregamento: req2.body.tempoRecarregamento
        }));

        mock.restore();
    })

    it('UpdatePartialCamiao: returns json with the new values of Camiao using updatePartialCamiao', async function () {
        let body = {
            matricula: "BB-21-AA",
            tara: 20,
            capacidade: 500,
        };
        let req: Partial<Request> = {};
        req.body = body;
        let param = {
            id: "12345"
        }
        req.params = param;

        let res: Partial<Response> = {};

        let body2 = {
            id: "12345",
            matricula: "BB-21-AA",
            tara: 45,
            capacidadeCarga: 70,
            cargaTotalBaterias: 2123,
            autonomia: 114,
            tempoRecarregamento: 67
        };
        let req2: Partial<Request> = {};
        req2.body = body2;
        req2.params = param;

        let res2: Partial<Response> = {
            json: sinon.spy()
        };

        let next: Partial<NextFunction> = () => { };


        let camiaoSchemaInstance = require("../persistence/schemas/camiaoSchema").default;
        Container.set("camiaoSchema", camiaoSchemaInstance);

        let camiaoRepoClass = require("../repos/camiaoRepo").default;
        let camiaoRepoInstance = Container.get(camiaoRepoClass);
        Container.set(config.repos.camiao.name, camiaoRepoInstance);

        let camiaoServiceClass = require("../services/camiaoService").default;
        let camiaoServiceInstance = Container.get(camiaoServiceClass);
        Container.set(config.services.camiao.name, camiaoServiceInstance);

        camiaoServiceInstance = Container.get("camiaoService");
        const mock = sinon.stub(camiaoServiceInstance, "partialUpdateCamiao").returns(Result.ok<ICamiaoDTO>({
            id: req2.body.Id, matricula: req2.body.matricula,
            tara: req.body.tara,
            capacidadeCarga: req.body.capacidadeCarga,
            cargaTotalBaterias: req2.body.cargaTotalBaterias,
            autonomia: req2.body.autonomia,
            tempoRecarregamento: req2.body.tempoRecarregamento
        }));


        const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

        await ctrl.partialUpdateCamiao(<Request>req2, <Response>res2, <NextFunction>next);

        sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock, sinon.match({
            matricula: req2.body.matricula,
            tara: req2.body.tara,
            capacidadeCarga: req2.body.capacidadeCarga,
            cargaTotalBaterias: req2.body.cargaTotalBaterias,
            autonomia: req2.body.autonomia,
            tempoRecarregamento: req2.body.tempoRecarregamento
        }));

        mock.restore();
    })

    it('Inibir Camião', async function () {

        let req: Partial<Request> = {};
        let param = {
            "matricula": "ER-21-AA"
        }
        req.params = param;

        let res: Partial<Response> = {
            json: sinon.spy()
        };

        let next: Partial<NextFunction> = () => { };

        let camiaoSchemaInstance = require("../persistence/schemas/camiaoSchema").default;
        Container.set("camiaoSchema", camiaoSchemaInstance);

        let camiaoRepoClass = require("../repos/camiaoRepo").default;
        let camiaoRepoInstance = Container.get(camiaoRepoClass);
        Container.set("camiaoRepo", camiaoRepoInstance);

        let camiaoServiceClass = require("../services/camiaoService").default;
        let camiaoServiceInstance = Container.get(camiaoServiceClass);
        Container.set("camiaoService", camiaoServiceInstance);


        camiaoServiceInstance = Container.get("camiaoService");
        const mock = sinon.stub(camiaoServiceInstance, "softDeleteCamiao").returns(Result.ok<ICamiaoDTO>(
            {
                id: "12345678",
                matricula: "ER-21-AA",
                tara: 20,
                capacidadeCarga: 500,
                cargaTotalBaterias: 2123,
                autonomia: 114,
                tempoRecarregamento: 67
            }
        ));

        const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

        await ctrl.inibirByMatricula(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock, sinon.match(
            req.params.matricula
        ));

        mock.restore();
    })

    it('Inibir camião que já foi inibido', async function () {

        let req: Partial<Request> = {};
        let param = {
            "matricula": "ER-21-AA"
        }
        req.params = param;

        let res: Partial<Response> = {
            json: sinon.spy()
        };

        let next: Partial<NextFunction> = () => { };

        let camiaoSchemaInstance = require("../persistence/schemas/camiaoSchema").default;
        Container.set("camiaoSchema", camiaoSchemaInstance);

        let camiaoRepoClass = require("../repos/camiaoRepo").default;
        let camiaoRepoInstance = Container.get(camiaoRepoClass);
        Container.set("camiaoRepo", camiaoRepoInstance);

        let camiaoServiceClass = require("../services/camiaoService").default;
        let camiaoServiceInstance = Container.get(camiaoServiceClass);
        Container.set("camiaoService", camiaoServiceInstance);


        camiaoServiceInstance = Container.get("camiaoService");
        const mock = sinon.stub(camiaoServiceInstance, "softDeleteCamiao").returns(null);

        const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

        await ctrl.inibirByMatricula(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock);

        mock.restore();
    })

    it('Reativar Camião', async function () {

        let req: Partial<Request> = {};
        let param = {
            "matricula": "ER-21-AA"
        }
        req.params = param;

        let res: Partial<Response> = {
            json: sinon.spy()
        };

        let next: Partial<NextFunction> = () => { };

        let camiaoSchemaInstance = require("../persistence/schemas/camiaoSchema").default;
        Container.set("camiaoSchema", camiaoSchemaInstance);

        let camiaoRepoClass = require("../repos/camiaoRepo").default;
        let camiaoRepoInstance = Container.get(camiaoRepoClass);
        Container.set("camiaoRepo", camiaoRepoInstance);

        let camiaoServiceClass = require("../services/camiaoService").default;
        let camiaoServiceInstance = Container.get(camiaoServiceClass);
        Container.set("camiaoService", camiaoServiceInstance);


        camiaoServiceInstance = Container.get("camiaoService");
        const mock = sinon.stub(camiaoServiceInstance, "restoreSoftDeleteCamiao").returns(Result.ok<ICamiaoDTO>(
            {
                id: "12345678",
                matricula: "ER-21-AA",
                tara: 20,
                capacidadeCarga: 500,
                cargaTotalBaterias: 2123,
                autonomia: 114,
                tempoRecarregamento: 67
            }
        ));

        const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

        await ctrl.desinibirByMatricula(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock, sinon.match(req.params.matricula
        ));

        mock.restore();
    })


    it('Reativar camião que já foi reativado', async function () {

        let req: Partial<Request> = {};
        let param = {
            "matricula": "ER-21-AA"
        }
        req.params = param;

        let res: Partial<Response> = {
            json: sinon.spy()
        };

        let next: Partial<NextFunction> = () => { };

        let camiaoSchemaInstance = require("../persistence/schemas/camiaoSchema").default;
        Container.set("camiaoSchema", camiaoSchemaInstance);

        let camiaoRepoClass = require("../repos/camiaoRepo").default;
        let camiaoRepoInstance = Container.get(camiaoRepoClass);
        Container.set("camiaoRepo", camiaoRepoInstance);

        let camiaoServiceClass = require("../services/camiaoService").default;
        let camiaoServiceInstance = Container.get(camiaoServiceClass);
        Container.set("camiaoService", camiaoServiceInstance);


        camiaoServiceInstance = Container.get("camiaoService");
        const mock = sinon.stub(camiaoServiceInstance, "restoreSoftDeleteCamiao").returns(null);

        const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

        await ctrl.desinibirByMatricula(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock);

        mock.restore();

    })

})






describe('Testes de integração entre controller e service', function () {

    it('Inibir Camião', async function () {

        let req: Partial<Request> = {};
        let param = {
            "matricula": "ER-21-AA"
        }
        req.params = param;

        let res: Partial<Response> = {
            json: sinon.spy()
        };

        let next: Partial<NextFunction> = () => { };

        let camiaoSchemaInstance = require("../persistence/schemas/camiaoSchema").default;
        Container.set("camiaoSchema", camiaoSchemaInstance);

        let camiaoRepoClass = require("../repos/camiaoRepo").default;
        let camiaoRepoInstance = Container.get(camiaoRepoClass);
        Container.set("camiaoRepo", camiaoRepoInstance);

        let camiaoServiceClass = require("../services/camiaoService").default;
        let camiaoServiceInstance = Container.get(camiaoServiceClass);
        Container.set("camiaoService", camiaoServiceInstance);

        camiaoServiceInstance = Container.get("camiaoService");
        const mock = sinon.stub(camiaoRepoInstance, "softDeleteCamiao").returns(Result.ok<ICamiaoDTO>(
            {
                id: "12345678",
                matricula: "ER-21-AA",
                tara: 20,
                capacidadeCarga: 500,
                cargaTotalBaterias: 2123,
                autonomia: 114,
                tempoRecarregamento: 67
            }
        ));

        const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

        await ctrl.inibirByMatricula(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock, sinon.match(req.params.matricula
        ));
        mock.restore();
    })

    it('Reativar Camião', async function () {

        let req: Partial<Request> = {};
        let param = {
            "matricula": "ER-21-AA"
        }
        req.params = param;

        let res: Partial<Response> = {
            json: sinon.spy()
        };

        let next: Partial<NextFunction> = () => { };

        let camiaoSchemaInstance = require("../persistence/schemas/camiaoSchema").default;
        Container.set("camiaoSchema", camiaoSchemaInstance);

        let camiaoRepoClass = require("../repos/camiaoRepo").default;
        let camiaoRepoInstance = Container.get(camiaoRepoClass);
        Container.set("camiaoRepo", camiaoRepoInstance);

        let camiaoServiceClass = require("../services/camiaoService").default;
        let camiaoServiceInstance = Container.get(camiaoServiceClass);
        Container.set("camiaoService", camiaoServiceInstance);

        camiaoServiceInstance = Container.get("camiaoService");
        const mock = sinon.stub(camiaoRepoInstance, "restoreSoftDeleteCamiao").returns(Result.ok<ICamiaoDTO>(
            {
                id: "12345678",
                matricula: "ER-21-AA",
                tara: 20,
                capacidadeCarga: 500,
                cargaTotalBaterias: 2123,
                autonomia: 114,
                tempoRecarregamento: 67
            }
        ));

        const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);

        await ctrl.desinibirByMatricula(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(mock);
        sinon.assert.calledWith(mock, sinon.match(req.params.matricula
        ));
        mock.restore();
    })



})




