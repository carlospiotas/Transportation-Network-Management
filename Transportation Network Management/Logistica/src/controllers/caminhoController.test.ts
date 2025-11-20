import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../config";

import { Result } from '../core/logic/Result';

import ICaminhoDTO from '../dto/ICaminhoDTO';
import CaminhoController from './caminhoController';
import ICaminhoService from '../services/IServices/ICaminhoService';

var sinonTest = require("sinon-test");
var test = sinonTest(sinon);

describe('caminho controller', function () {
    beforeEach(function () {
    });

    it('createCaminhho: returns json with object values', test( async function () {
        let body = {
            "energiaNecessariaKWh": 100,
            "tempoDeslocacaoMin": 200,
            "idArmazemOrigem": 'zzz',
            "idArmazemDestino": 'aaa',
            "distanciaEntreArmazens": 15
        };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: this.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let caminhoServiceClass = require(config.services.caminho.path).default;
        Container.set(config.repos.caminho.name, "testCaminhoRepo");
        Container.set(config.repos.armazem.name, "testArmazemRepo");
        let caminhoServiceInstance = Container.get(caminhoServiceClass)
        Container.set(config.services.caminho.name, caminhoServiceInstance);

        caminhoServiceInstance = Container.get(config.services.caminho.name);
        const stub = this.stub(caminhoServiceInstance, 'createCaminho').returns(
            Result.ok<ICaminhoDTO>({
                "id": "123",
                "energiaNecessariaKWh": req.body.energiaNecessariaKWh,
                "tempoDeslocacaoMin": req.body.tempoDeslocacaoMin,
                "idArmazemOrigem": req.body.idArmazemOrigem,
                "idArmazemDestino": req.body.idArmazemDestino,
                "distanciaEntreArmazens": req.body.distanciaEntreArmazens,
            }),
        );

        const stub2 = this.stub(caminhoServiceInstance, 'checkArmazemId').returns(true);

        const ctrl = new CaminhoController(caminhoServiceInstance as ICaminhoService);

        await ctrl.createCaminho(<Request>req, <Response>res, <NextFunction>next);
    
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(
            stub,
            sinon.match({
                "energiaNecessariaKWh": req.body.energiaNecessariaKWh,
                "tempoDeslocacaoMin": req.body.tempoDeslocacaoMin,
                "idArmazemOrigem": req.body.idArmazemOrigem,
                "idArmazemDestino": req.body.idArmazemDestino,
                "distanciaEntreArmazens": req.body.distanciaEntreArmazens,
            })
        );

    }));


    it('updateCaminho: returns json with object values', test( async function () {
        let body = {
            "energiaNecessariaKWh": 100,
            "tempoDeslocacaoMin": 200,
            "idArmazemOrigem": 'zzz',
            "idArmazemDestino": 'aaa',
            "distanciaEntreArmazens": 15
        };
        let req: Partial<Request> = {};
        req.body = body;
        let param = { "id": "123" };
        req.params = param;

        let res: Partial<Response> = {
            json: this.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let body2 = { 
            "energiaNecessariaKWh": 10,
            "tempoDeslocacaoMin": 20,
            "idArmazemOrigem": 'zzz',
            "idArmazemDestino": 'bbb',
            "distanciaEntreArmazens": 15
        };

        let req2: Partial<Request> = {};
        req2.body = body2;

        let caminhoServiceClass = require(config.services.caminho.path).default;
        
        //Container.set(config.repos.caminho.name, "testCaminhoRepo");
        //Container.set(config.repos.armazem.name, "testArmazemRepo");
        let caminhoServiceInstance = Container.get(caminhoServiceClass)
        //Container.set(config.services.caminho.name, caminhoServiceInstance);

        caminhoServiceInstance = Container.get(config.services.caminho.name);
        const stub = this.stub(caminhoServiceInstance, 'updateCaminho').returns(
            Result.ok<ICaminhoDTO>({
                "id": "123",
                "energiaNecessariaKWh": req.body.energiaNecessariaKWh,
                "tempoDeslocacaoMin": req.body.tempoDeslocacaoMin,
                "idArmazemOrigem": req.body.idArmazemOrigem,
                "idArmazemDestino": req.body.idArmazemDestino,
                "distanciaEntreArmazens": req.body.distanciaEntreArmazens,
            }),
        );

        const stub2 = this.stub(caminhoServiceInstance, 'checkArmazemId').returns(true);

        const ctrl = new CaminhoController(caminhoServiceInstance as ICaminhoService);

        await ctrl.updateCaminho(<Request>req, <Response>res, <NextFunction>next);
    
        sinon.assert.calledOnce(stub);
        sinon.assert.calledWith(
            stub,
            sinon.match({
                "energiaNecessariaKWh": req.body.energiaNecessariaKWh,
                "tempoDeslocacaoMin": req.body.tempoDeslocacaoMin,
                "idArmazemOrigem": req.body.idArmazemOrigem,
                "idArmazemDestino": req.body.idArmazemDestino,
                "distanciaEntreArmazens": req.body.distanciaEntreArmazens,
            })
        );

    }));


    it('partialUpdateCaminho: returns json with object values', test( async function () {
        let body = {
            "energiaNecessariaKWh": 100,
            "tempoDeslocacaoMin": 200,
            "idArmazemOrigem": 'zzz',
            "idArmazemDestino": 'aaa',
            "distanciaEntreArmazens": 15
        };
        let req: Partial<Request> = {};
        req.body = body;
        let param = { "id": "123" };
        req.params = param;

        let res: Partial<Response> = {
            json: this.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let body2 = { 
            "energiaNecessariaKWh": 10,
            "tempoDeslocacaoMin": 20,
            "idArmazemOrigem": 'zzz',
            "idArmazemDestino": 'bbb',
            "distanciaEntreArmazens": 15
        };

        let req2: Partial<Request> = {};
        req2.body = body2;

        let caminhoServiceClass = require(config.services.caminho.path).default;
        let caminhoServiceInstance = Container.get(caminhoServiceClass)

        caminhoServiceInstance = Container.get(config.services.caminho.name);
        const stub = this.stub(caminhoServiceInstance, 'partialUpdateCaminho').returns(
            Result.ok<ICaminhoDTO>({
                "id": "123",
                "energiaNecessariaKWh": req.body.energiaNecessariaKWh,
                "tempoDeslocacaoMin": req2.body.tempoDeslocacaoMin,
                "idArmazemOrigem": req.body.idArmazemOrigem,
                "idArmazemDestino": req2.body.idArmazemDestino,
                "distanciaEntreArmazens": req.body.distanciaEntreArmazens,
            }),
        );

        const stub2 = this.stub(caminhoServiceInstance, 'checkArmazemId').returns(true);

        const ctrl = new CaminhoController(caminhoServiceInstance as ICaminhoService);

        await ctrl.partialUpdateCaminho(<Request>req, <Response>res, <NextFunction>next);
    
        sinon.assert.calledOnce(stub);
        sinon.assert.calledWith(
            stub,
            sinon.match({
                "energiaNecessariaKWh": req.body.energiaNecessariaKWh,
                "tempoDeslocacaoMin": req.body.tempoDeslocacaoMin,
                "idArmazemOrigem": req.body.idArmazemOrigem,
                "idArmazemDestino": req.body.idArmazemDestino,
                "distanciaEntreArmazens": req.body.distanciaEntreArmazens,
            })
        );

    }));


    it('getById: returns json with object values', test( async function () {
        let body = {
            "energiaNecessariaKWh": 100,
            "tempoDeslocacaoMin": 200,
            "idArmazemOrigem": 'zzz',
            "idArmazemDestino": 'aaa',
            "distanciaEntreArmazens": 15
        };
        let req: Partial<Request> = {};
        let param = {
            "id": "123"
        }
        req.params = param;

        let res: Partial<Response> = {
            json: this.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let caminhoServiceClass = require(config.services.caminho.path).default;
        Container.set(config.repos.caminho.name, "testCaminhoRepo");
        let caminhoServiceInstance = Container.get(caminhoServiceClass)
        Container.set(config.services.caminho.name, caminhoServiceInstance);

        caminhoServiceInstance = Container.get(config.services.caminho.name);
        const stub = this.stub(caminhoServiceInstance, 'getById').returns(
            Result.ok<ICaminhoDTO>({
                "id": "123",
                "energiaNecessariaKWh": body.energiaNecessariaKWh,
                "tempoDeslocacaoMin": body.tempoDeslocacaoMin,
                "idArmazemOrigem": body.idArmazemOrigem,
                "idArmazemDestino": body.idArmazemDestino,
                "distanciaEntreArmazens": body.distanciaEntreArmazens,
            }),
        );

        const ctrl = new CaminhoController(caminhoServiceInstance as ICaminhoService);

        await ctrl.getById(<Request>req, <Response>res, <NextFunction>next);
    
        sinon.assert.calledOnce(stub);
        sinon.assert.calledWith(
            stub,
            sinon.match("123")
        );

    }));


    it('listarTodosCaminhos: returns json with object values', test( async function () {
        let body = {
            "energiaNecessariaKWh": 100,
            "tempoDeslocacaoMin": 200,
            "idArmazemOrigem": 'zzz',
            "idArmazemDestino": 'aaa',
            "distanciaEntreArmazens": 15
        };
        let body2 = {
            "energiaNecessariaKWh": 10,
            "tempoDeslocacaoMin": 20,
            "idArmazemOrigem": 'bbb',
            "idArmazemDestino": 'aaa',
            "distanciaEntreArmazens": 151
        };
        let req: Partial<Request> = {};


        let res: Partial<Response> = {
            json: this.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let caminhoServiceClass = require(config.services.caminho.path).default;
        Container.set(config.repos.caminho.name, "listarTodosCaminhos");
        let caminhoServiceInstance = Container.get(caminhoServiceClass)
        Container.set(config.services.caminho.name, caminhoServiceInstance);

        caminhoServiceInstance = Container.get(config.services.caminho.name);
        const stub = this.stub(caminhoServiceInstance, 'listarTodosCaminhos').returns(
            Result.ok<ICaminhoDTO[]>([{
                "id": "123",
                "energiaNecessariaKWh": body.energiaNecessariaKWh,
                "tempoDeslocacaoMin": body.tempoDeslocacaoMin,
                "idArmazemOrigem": body.idArmazemOrigem,
                "idArmazemDestino": body.idArmazemDestino,
                "distanciaEntreArmazens": body.distanciaEntreArmazens,
            },{
                "id": "321",
                "energiaNecessariaKWh": body2.energiaNecessariaKWh,
                "tempoDeslocacaoMin": body2.tempoDeslocacaoMin,
                "idArmazemOrigem": body2.idArmazemOrigem,
                "idArmazemDestino": body2.idArmazemDestino,
                "distanciaEntreArmazens": body2.distanciaEntreArmazens,
            }
        ]),
        );

        const ctrl = new CaminhoController(caminhoServiceInstance as ICaminhoService);

        await ctrl.listarTodosCaminhos(<Request>req, <Response>res, <NextFunction>next);
    
        sinon.assert.calledOnce(stub);
        sinon.assert.calledWith(
            stub);

    }));


    it('listarPorIdArmazemOrigem: returns json with object values', test( async function () {
        let body = {
            "energiaNecessariaKWh": 100,
            "tempoDeslocacaoMin": 200,
            "idArmazemOrigem": 'zzz',
            "idArmazemDestino": 'aaa',
            "distanciaEntreArmazens": 15
        };
        let req: Partial<Request> = {};
        let param = {
            "idArmazemOrigem": "aaa"
        }
        req.params = param;

        let res: Partial<Response> = {
            json: this.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let caminhoServiceClass = require(config.services.caminho.path).default;
        Container.set(config.repos.caminho.name, "testCaminhoRepo");
        let caminhoServiceInstance = Container.get(caminhoServiceClass)
        Container.set(config.services.caminho.name, caminhoServiceInstance);

        caminhoServiceInstance = Container.get(config.services.caminho.name);
        const stub = this.stub(caminhoServiceInstance, 'listarPorIdArmazemOrigem').returns(
            Result.ok<ICaminhoDTO>({
                "id": "123",
                "energiaNecessariaKWh": body.energiaNecessariaKWh,
                "tempoDeslocacaoMin": body.tempoDeslocacaoMin,
                "idArmazemOrigem": body.idArmazemOrigem,
                "idArmazemDestino": body.idArmazemDestino,
                "distanciaEntreArmazens": body.distanciaEntreArmazens,
            }),
        );

        const ctrl = new CaminhoController(caminhoServiceInstance as ICaminhoService);

        await ctrl.listarPorIdArmazemOrigem(<Request>req, <Response>res, <NextFunction>next);
    
        sinon.assert.calledOnce(stub);
        sinon.assert.calledWith(
            stub,
            sinon.match("aaa")
        );

    }));


    it('listarPorIdArmazemDestino: returns json with object values', test( async function () {
        let body = {
            "energiaNecessariaKWh": 100,
            "tempoDeslocacaoMin": 200,
            "idArmazemOrigem": 'zzz',
            "idArmazemDestino": 'aaa',
            "distanciaEntreArmazens": 15
        };
        let req: Partial<Request> = {};
        let param = {
            "idArmazemDestino": "aaa"
        }
        req.params = param;

        let res: Partial<Response> = {
            json: this.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let caminhoServiceClass = require(config.services.caminho.path).default;
        Container.set(config.repos.caminho.name, "testCaminhoRepo");
        let caminhoServiceInstance = Container.get(caminhoServiceClass)
        Container.set(config.services.caminho.name, caminhoServiceInstance);

        caminhoServiceInstance = Container.get(config.services.caminho.name);
        const stub = this.stub(caminhoServiceInstance, 'listarPorIdArmazemDestino').returns(
            Result.ok<ICaminhoDTO>({
                "id": "123",
                "energiaNecessariaKWh": body.energiaNecessariaKWh,
                "tempoDeslocacaoMin": body.tempoDeslocacaoMin,
                "idArmazemOrigem": body.idArmazemOrigem,
                "idArmazemDestino": body.idArmazemDestino,
                "distanciaEntreArmazens": body.distanciaEntreArmazens,
            }),
        );

        const ctrl = new CaminhoController(caminhoServiceInstance as ICaminhoService);

        await ctrl.listarPorIdArmazemDestino(<Request>req, <Response>res, <NextFunction>next);
    
        sinon.assert.calledOnce(stub);
        sinon.assert.calledWith(
            stub,
            sinon.match("aaa")
        );

    }));

    it('listarTodosCaminhosPaginacao: returns json with object values', test( async function () {
        let body = {
            "energiaNecessariaKWh": 100,
            "tempoDeslocacaoMin": 200,
            "idArmazemOrigem": 'zzz',
            "idArmazemDestino": 'aaa',
            "distanciaEntreArmazens": 15
        };
        let req: Partial<Request> = {};
        let param = {
            "page": "1"
        }
        req.params = param;

        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let resBody= {
            "totalItems": 6,
            "totalPages": 2,
            "currentPage": 1,
            "pageSize": 3,
            "data":[{
                "id": "123",
                "energiaNecessariaKWh": body.energiaNecessariaKWh,
                "tempoDeslocacaoMin": body.tempoDeslocacaoMin,
                "idArmazemOrigem": body.idArmazemOrigem,
                "idArmazemDestino": body.idArmazemDestino,
                "distanciaEntreArmazens": body.distanciaEntreArmazens,
            },{
                "id": "321",
                "energiaNecessariaKWh": 30,
                "tempoDeslocacaoMin": 30,
                "idArmazemOrigem": "003",
                "idArmazemDestino": "001",
                "distanciaEntreArmazens": 30,
            },{
                "id": "322",
                "energiaNecessariaKWh": 40,
                "tempoDeslocacaoMin": 50,
                "idArmazemOrigem": "002",
                "idArmazemDestino": "001",
                "distanciaEntreArmazens": 10,
            }
        ]

            
        }
        let next: Partial<NextFunction> = () => { };

        let caminhoServiceClass = require(config.services.caminho.path).default;
        Container.set(config.repos.caminho.name, "testCaminhoRepo");
        let caminhoServiceInstance = Container.get(caminhoServiceClass)
        Container.set(config.services.caminho.name, caminhoServiceInstance);

        caminhoServiceInstance = Container.get(config.services.caminho.name);
        const stub = this.stub(caminhoServiceInstance, 'listarTodosCaminhosPaginacao').returns(
            Result.ok<ICaminhoDTO[]>([{
                "id": "123",
                "energiaNecessariaKWh": body.energiaNecessariaKWh,
                "tempoDeslocacaoMin": body.tempoDeslocacaoMin,
                "idArmazemOrigem": body.idArmazemOrigem,
                "idArmazemDestino": body.idArmazemDestino,
                "distanciaEntreArmazens": body.distanciaEntreArmazens,
            },{
                "id": "321",
                "energiaNecessariaKWh": 30,
                "tempoDeslocacaoMin": 30,
                "idArmazemOrigem": "003",
                "idArmazemDestino": "001",
                "distanciaEntreArmazens": 30,
            },{
                "id": "322",
                "energiaNecessariaKWh": 40,
                "tempoDeslocacaoMin": 50,
                "idArmazemOrigem": "002",
                "idArmazemDestino": "001",
                "distanciaEntreArmazens": 10,
            }
        ]),
        );

        const stub2 = this.stub(caminhoServiceInstance, 'listarTodosCaminhos').returns(
            Result.ok<ICaminhoDTO[]>([{
                "id": "123",
                "energiaNecessariaKWh": body.energiaNecessariaKWh,
                "tempoDeslocacaoMin": body.tempoDeslocacaoMin,
                "idArmazemOrigem": body.idArmazemOrigem,
                "idArmazemDestino": body.idArmazemDestino,
                "distanciaEntreArmazens": body.distanciaEntreArmazens,
            },{
                "id": "321",
                "energiaNecessariaKWh": 30,
                "tempoDeslocacaoMin": 30,
                "idArmazemOrigem": "003",
                "idArmazemDestino": "001",
                "distanciaEntreArmazens": 30,
            },{
                "id": "322",
                "energiaNecessariaKWh": 40,
                "tempoDeslocacaoMin": 50,
                "idArmazemOrigem": "002",
                "idArmazemDestino": "001",
                "distanciaEntreArmazens": 10,
            },{
                "id": "321",
                "energiaNecessariaKWh": 30,
                "tempoDeslocacaoMin": 30,
                "idArmazemOrigem": "003",
                "idArmazemDestino": "001",
                "distanciaEntreArmazens": 30,
            },{
                "id": "321",
                "energiaNecessariaKWh": 30,
                "tempoDeslocacaoMin": 30,
                "idArmazemOrigem": "003",
                "idArmazemDestino": "001",
                "distanciaEntreArmazens": 30,
            },{
                "id": "321",
                "energiaNecessariaKWh": 30,
                "tempoDeslocacaoMin": 30,
                "idArmazemOrigem": "003",
                "idArmazemDestino": "001",
                "distanciaEntreArmazens": 30,
            }
        ]),
        );

        const ctrl = new CaminhoController(caminhoServiceInstance as ICaminhoService);

        await ctrl.listarTodosCaminhosPaginacao(<Request>req, <Response>res, <NextFunction>next);
        
    
        sinon.assert.calledOnce(stub);
        sinon.assert.calledOnce(stub2);
        sinon.assert.calledWith(
            stub,
            sinon.match(1)
        );
        stub.restore();
        stub2.restore();

    }));


    it('deleteById: returns json with object values', test( async function () {
        let body = {
            "energiaNecessariaKWh": 100,
            "tempoDeslocacaoMin": 200,
            "idArmazemOrigem": 'zzz',
            "idArmazemDestino": 'aaa',
            "distanciaEntreArmazens": 15
        };
        let req: Partial<Request> = {};
        let param = {
            "id": "aaa"
        }
        req.params = param;

        let res: Partial<Response> = {
            json: this.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let caminhoServiceClass = require(config.services.caminho.path).default;
        Container.set(config.repos.caminho.name, "testCaminhoRepo");
        let caminhoServiceInstance = Container.get(caminhoServiceClass)
        Container.set(config.services.caminho.name, caminhoServiceInstance);

        caminhoServiceInstance = Container.get(config.services.caminho.name);
        const stub = this.stub(caminhoServiceInstance, 'deleteById').returns(
            Result.ok<ICaminhoDTO>({
                "id": "123",
                "energiaNecessariaKWh": body.energiaNecessariaKWh,
                "tempoDeslocacaoMin": body.tempoDeslocacaoMin,
                "idArmazemOrigem": body.idArmazemOrigem,
                "idArmazemDestino": body.idArmazemDestino,
                "distanciaEntreArmazens": body.distanciaEntreArmazens,
            }),
        );

        const ctrl = new CaminhoController(caminhoServiceInstance as ICaminhoService);

        await ctrl.deleteById(<Request>req, <Response>res, <NextFunction>next);
    
        sinon.assert.calledOnce(stub);
        sinon.assert.calledWith(
            stub,
            sinon.match("aaa")
        );

    }));

});