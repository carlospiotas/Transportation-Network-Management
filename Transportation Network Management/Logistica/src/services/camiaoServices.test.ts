import * as sinon from 'sinon';
import 'reflect-metadata';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from '../../config';

import { Result } from '../core/logic/Result';
import ICamiaoDTO from "../dto/ICamiaoDTO"
import { Camiao } from '../domain/camiao/camiao';
import ICamiaoRepo from './IRepos/ICamiaoRepo';
import CamiaoService from './camiaoService';
import { CamiaoMap } from '../mappers/CamiaoMap';
import { CamiaoAutonomia } from '../domain/camiao/camiaoAutonomia';
import { CamiaoMatricula } from '../domain/camiao/camiaoMatricula';
import { CamiaoCapacidadeCarga } from '../domain/camiao/camiaoCapacidadeCarga';
import { CamiaoCargaTotalBaterias } from '../domain/camiao/camiaoCargaTotalBaterias';
import { CamiaoTara } from '../domain/camiao/camiaoTara';
import { CamiaoTempoRecarregamento } from '../domain/camiao/camiaoTempoRecarregamento';
import { MockJobAggregateRoot } from '../core/domain/events/tests/mocks/domain/mockJobAggregateRoot';


describe('camiao service', function () {
    beforeEach(function () { });


    let camiaoSchemaClass = require("../persistence/schemas/camiaoSchema")
    Container.set('camiaoSchema', camiaoSchemaClass);

    let camiaoRepoClass = require("../repos/camiaoRepo").default;
    let camiaoRepoInstance = Container.get(camiaoRepoClass);
    Container.set(config.repos.camiao.name, camiaoRepoInstance);

    it('createCamiao : returns json with values', async function () {

        const body = {
            matricula: 'AA-11-BB',
            tara: 200,
            capacidadeCarga: 100,
            cargaTotalBaterias: 20,
            autonomia: 15,
            tempoRecarregamento: 20,
        } as ICamiaoDTO;

        const resu = CamiaoMap.toDomain(body);
        camiaoRepoInstance = Container.get(config.repos.camiao.name);
        const mock = sinon.stub(camiaoRepoInstance, "save").returns(Result.ok<Camiao>((await resu)));

        const serv = new CamiaoService(camiaoRepoInstance as ICamiaoRepo);

        const res = await (await (await serv.createCamiao(body)).getValue());

        sinon.assert.match(res, body);
        mock.restore();
    })


    it('getByID : return Json with camiao', async function () {

        const body = {
            matricula: 'AA-11-BB',
            tara: 201,
            capacidadeCarga: 100,
            cargaTotalBaterias: 20,
            autonomia: 15,
            tempoRecarregamento: 20,
        } as ICamiaoDTO;

        const resu = CamiaoMap.toDomain(body);
        camiaoRepoInstance = Container.get(config.repos.camiao.name);
        const mock = sinon.stub(camiaoRepoInstance, "findById").returns(resu);

        const serv = new CamiaoService(camiaoRepoInstance as ICamiaoRepo);


        const res = await (await (await serv.getById((await resu).id.toString())).getValue());

        sinon.assert.match(res, body);
        mock.restore();

    })



    /*it('getByMatricula : return Json with camiao',async function()  {

        let body = {
            id:'',
            matricula: 'AA-11-BB',
            tara: 202,
            capacidadeCarga: 100,
            cargaTotalBaterias: 20,
            autonomia: 15,
            tempoRecarregamento: 20,
        } as ICamiaoDTO;

        const resu = CamiaoMap.toDomain(body);
        camiaoRepoInstance = Container.get(config.repos.camiao.name);
        const mock =sinon.stub(camiaoRepoInstance , "getByMatricula").returns(resu);
        
        const serv = new CamiaoService(camiaoRepoInstance as ICamiaoRepo);

        serv.createCamiao(body);

        const res = await (await (await serv.getByMatricula("AA-11-BB")));

        body.id = res.getValue().id;


        sinon.assert.match(res.getValue(), body);
        mock.restore();
        
    })*/

    /*it('getAll : return Json com todos os camioes',async function()  {

        let body = {
            matricula: 'AA-11-BB',
            tara: 203,
            capacidadeCarga: 100,
            cargaTotalBaterias: 20,
            autonomia: 15,
            tempoRecarregamento: 20,
        } as ICamiaoDTO;

        let body2 = {
            matricula: 'AB-11-BA',
            tara: 203,
            capacidadeCarga: 100,
            cargaTotalBaterias: 20,
            autonomia: 15,
            tempoRecarregamento: 20,
        } as ICamiaoDTO;

        const resu2 = await Camiao.create({
            matricula: CamiaoMatricula.create(body2.matricula).getValue(),
            tara: CamiaoTara.create(body2.tara).getValue(),
            capacidadeCarga: CamiaoCapacidadeCarga.create(body2.capacidadeCarga).getValue(),
            cargaTotalBaterias: CamiaoCargaTotalBaterias.create(body2.cargaTotalBaterias).getValue(),
            autonomia: CamiaoAutonomia.create(body2.autonomia).getValue(),
            tempoRecarregamento: CamiaoTempoRecarregamento.create(body2.tempoRecarregamento).getValue(),});

        const resu3 = await Camiao.create({
            matricula: CamiaoMatricula.create(body.matricula).getValue(),
            tara: CamiaoTara.create(body.tara).getValue(),
            capacidadeCarga: CamiaoCapacidadeCarga.create(body.capacidadeCarga).getValue(),
            cargaTotalBaterias: CamiaoCargaTotalBaterias.create(body.cargaTotalBaterias).getValue(),
            autonomia: CamiaoAutonomia.create(body.autonomia).getValue(),
            tempoRecarregamento: CamiaoTempoRecarregamento.create(body.tempoRecarregamento).getValue(),});
            

        camiaoRepoInstance = Container.get(config.repos.camiao.name);
        const mock = sinon.stub(camiaoRepoInstance , "getAll").returns(( [resu3.getValue(),resu2.getValue()]));
        
        const serv = new CamiaoService(camiaoRepoInstance as ICamiaoRepo);

        serv.createCamiao(body);
        serv.createCamiao(body2);

        const res = await (await (await serv.getAll()));

        body.id = res.getValue()[0].id;
        body2.id = res.getValue()[1].id;

        sinon.assert.match([res.getValue()[0], res.getValue()[1]], [body, body2]);
        mock.restore();
    })*/

    it('returns json with the values when updateCamiao', async function () {


        let body = {
            matricula: 'AA-11-BB',
            tara: 203,
            capacidadeCarga: 100,
            cargaTotalBaterias: 20,
            autonomia: 15,
            tempoRecarregamento: 20,
        } as ICamiaoDTO;

        let body2 = {
            id: '',
            matricula: 'AA-11-BB',
            tara: 203,
            capacidadeCarga: 101,
            cargaTotalBaterias: 20,
            autonomia: 15,
            tempoRecarregamento: 20,
        } as ICamiaoDTO;

        const resu = CamiaoMap.toDomain(body);
        const resu2 = CamiaoMap.toDomain(body2);
        camiaoRepoInstance = Container.get(config.repos.camiao.name);

        let mock = sinon.stub(camiaoRepoInstance, "findById").returns((resu));
        let mock2 = sinon.stub(camiaoRepoInstance, "save").returns(Result.ok<Camiao>((await resu2)));

        const serv = new CamiaoService(camiaoRepoInstance as ICamiaoRepo);

        serv.createCamiao(body);

        const result = await (await serv.updateCamiao(body2)).getValue();

        body2.id = result.id;

        sinon.assert.match(result, body2);

        mock.restore();
        mock2.restore();

    });

    //test softDeleteCamiao

    it('returns json with the values when softDeleteCamiao', async function () {


        let body = {
            matricula: 'AA-11-BB',
            tara: 203,
            capacidadeCarga: 100,
            cargaTotalBaterias: 20,
            autonomia: 15,
            tempoRecarregamento: 20,
        } as ICamiaoDTO;

        const resu = CamiaoMap.toDomain(body);
        camiaoRepoInstance = Container.get(config.repos.camiao.name);

        let mock = sinon.stub(camiaoRepoInstance, "softDeleteCamiao").returns((resu));

        
        let mock3 = sinon.stub(camiaoRepoInstance, "save").returns(Result.ok<Camiao>((await resu)));

        const serv = new CamiaoService(camiaoRepoInstance as ICamiaoRepo);

        serv.createCamiao(body);
        const result = await (await serv.softDeleteCamiao(body.matricula)).getValue();

        body.id = result.id;

        sinon.assert.match(result, body);

        mock.restore();
        mock3.restore();

    });

    it('softDeleteCamiao com matricula inexistente', async function () {

        let body = {
            matricula: 'AA-11-BB',
            tara: 203,
            capacidadeCarga: 100,
            cargaTotalBaterias: 20,
            autonomia: 15,
            tempoRecarregamento: 20,
        } as ICamiaoDTO;

        const resu = CamiaoMap.toDomain(body);
        camiaoRepoInstance = Container.get(config.repos.camiao.name);

        let mock = sinon.stub(camiaoRepoInstance, "softDeleteCamiao").returns(null);
        let mock3 = sinon.stub(camiaoRepoInstance, "save").returns(Result.ok<Camiao>((await resu)));

        const serv = new CamiaoService(camiaoRepoInstance as ICamiaoRepo);

        serv.createCamiao(body);

        const result = await (await serv.softDeleteCamiao('AA-11-CC'));

        sinon.assert.match(result.isFailure, true);

        mock.restore();
        mock3.restore();
    });

    //test restoreSoftDeleteCamiao

    it('returns json with the values when restoreSoftDeleteCamiao', async function () {

        let body = {
            matricula: 'AA-11-BB',
            tara: 203,
            capacidadeCarga: 100,
            cargaTotalBaterias: 20,
            autonomia: 15,
            tempoRecarregamento: 20,
        } as ICamiaoDTO;

        const resu = CamiaoMap.toDomain(body);
        camiaoRepoInstance = Container.get(config.repos.camiao.name);

        let mock = sinon.stub(camiaoRepoInstance, "restoreSoftDeleteCamiao").returns((resu));

        let mock3 = sinon.stub(camiaoRepoInstance, "save").returns(Result.ok<Camiao>((await resu)));

        const serv = new CamiaoService(camiaoRepoInstance as ICamiaoRepo);

        serv.createCamiao(body);
        const result = await (await serv.restoreSoftDeleteCamiao(body.matricula)).getValue();

        body.id = result.id;

        sinon.assert.match(result, body);

        mock.restore();
        mock3.restore();

    });

    it('restoreSoftDeleteCamiao com matricula inexistente', async function () {

        let body = {
            matricula: 'AA-11-BB',
            tara: 203,
            capacidadeCarga: 100,
            cargaTotalBaterias: 20,
            autonomia: 15,
            tempoRecarregamento: 20,
        } as ICamiaoDTO;

        const resu = CamiaoMap.toDomain(body);
        camiaoRepoInstance = Container.get(config.repos.camiao.name);

        let mock = sinon.stub(camiaoRepoInstance, "restoreSoftDeleteCamiao").returns(null);
        let mock3 = sinon.stub(camiaoRepoInstance, "save").returns(Result.ok<Camiao>((await resu)));

        const serv = new CamiaoService(camiaoRepoInstance as ICamiaoRepo);

        serv.createCamiao(body);

        const result = await (await serv.restoreSoftDeleteCamiao('AA-11-CC'));

        sinon.assert.match(result.isFailure, true);

        mock.restore();
        mock3.restore();
    });

});