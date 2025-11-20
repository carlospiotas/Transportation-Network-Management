import Container from 'typedi';
import config from '../../config';
import PlanoEntregasRepo from '../repos/planoEntregasRepo';
import IPlanoEntregasRepo from '../services/IRepos/IPlanoEntregasRepo';
import IPlanoEntregasService from '../services/IServices/IPlanoEntregasService'
import PlanoEntregasController from './planoEntregasController';
import * as sinon from 'sinon';
import * as chai from 'chai';
import PlanoEntregasService from '../services/planoEntregasService';
import { NextFunction, Request, Response } from 'express';
import { stubArray } from 'lodash';


var sinonTest = require("sinon-test");
var test = sinonTest(sinon);
var expect = chai.expect;


describe('PlanoEntregasControllerIntegracao', () => {



    it('planoFrotaCompleta', test(async function () {
        let planoEntregaSchema = require('../persistence/schemas/planoEntregaSchema');
        Container.set('planoEntregaSchema', planoEntregaSchema);

        let planoEntregasRepo = require('../repos/planoEntregasRepo').default;
        let planoEntregasRepoInstance = Container.get(planoEntregasRepo);
        Container.set(config.repos.planoEntregas.name, planoEntregasRepoInstance);


        const planoEntregaService = new PlanoEntregasService(planoEntregasRepoInstance as IPlanoEntregasRepo);
        const ctrl = new PlanoEntregasController(planoEntregaService as IPlanoEntregasService);

        let planoEntrega = {
            "dia": "1",
            "mes": "12",
            "ano": "2022"
        }

        let planoEntregaRetorno = {
            "dia": "1",
            "mes": "12",
            "ano": "2022"
        }

        let planoEntregaRetornoEsperado = {
            "dia": "1",
            "mes": "12",
            "ano": "2022"
        }

        //stub repos
        let planoEntregaStub = sinon.stub(planoEntregasRepoInstance, 'getFrotaCompleta').returns(planoEntregaRetornoEsperado);
        const req: Partial<Request> = {};
        //req leva dia,mes,ano
        req.params = planoEntrega;

        var res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub().returnsThis()
        }

        var next = sinon.stub();
        //call controller
        let planoEntregaRetornoController = await ctrl.getFrotaPlaneamento(<Request>req, <Response>res, <NextFunction>next);

        //assert result res with expected
        //expect(res).to.be.deep.equal(planoEntregaRetornoEsperado);
        
        

        
    }));




});