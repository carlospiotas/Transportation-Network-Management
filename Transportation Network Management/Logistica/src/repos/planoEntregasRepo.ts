import { Service, Inject } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import { IPlanoEntregaPersistence } from '../dataschema/IPlanoEntregaPersistence';
import fetch from 'node-fetch';
import config from "../../config";
import { PlanoEntregaMap } from "../mappers/PlanoEntregaMap"

import IPlanoEntregasRepo from '../services/IRepos/IPlanoEntregasRepo';
import { json } from 'body-parser';
import { PlanoEntrega } from '../domain/planoEntrega/planoEntrega';
import { resolve } from 'path';
const https = require('https');

@Service()
export default class PlanoEntregasRepo implements IPlanoEntregasRepo {

    private models: any;
    constructor(
        @Inject('planoEntregaSchema') private PlanoEntregaSchema:Model<IPlanoEntregaPersistence & Document>,
    ) { }

    private limit = 3;


    public async existsDataArmazem(data: Date , matricula:string): Promise<boolean> {

        const query = { data: data,camiaoMatricula:matricula };
        const caminhoDocument = await this.PlanoEntregaSchema.findOne(query as FilterQuery<IPlanoEntregaPersistence & Document>);

        return !!caminhoDocument === true;
    }

    public async save(plano: PlanoEntrega): Promise<PlanoEntrega> {
        const query = { domainId: plano.id.toString() };

        const PlanoDocument = await this.PlanoEntregaSchema.findOne(query);

        try {
            if (PlanoDocument === null) {
                const rawCamiao: any = PlanoEntregaMap.toPersistence(plano);

                const CamiaoCreated = await this.PlanoEntregaSchema.create(rawCamiao);

                return PlanoEntregaMap.toDomain(CamiaoCreated);
            } else {
                PlanoDocument.camiaoMatricula = plano.camiaoMatricula;
                PlanoDocument.caminho = plano.caminho;
                PlanoDocument.date = plano.data.toDateString();
                PlanoDocument.entregas = plano.entregas;
                
                await PlanoDocument.save();
                return plano;
            }
        } catch (err) {
            throw err;
        }
    }

    public async getAll (): Promise<Array<PlanoEntrega>>{
        const query = {};
        const camioesRecords = await this.PlanoEntregaSchema.find(query as FilterQuery<IPlanoEntregaPersistence & Document>);
    
        if( camioesRecords != null) {
          let camioes: Array<PlanoEntrega> = [];
          camioesRecords.forEach(async function (camiaoRecord){
            camioes.push(await PlanoEntregaMap.toDomain(camiaoRecord))
          })
          return camioes
        }
        else
          return null;
    }


    public async getPlanoEntregas(data: Date): Promise<string[]> {
        var dia:string;
        var mes:string;
        if(data.getDate() < 10){
             dia = '0'+data.getDate();
        }else{
            dia = ''+data.getDate();
        }

        if(data.getMonth()+1 <10){
            mes = '0'+data.getMonth()+1;
        }else{
            mes = ''+(data.getMonth()+1);
        }

        try {
            var planoJson;
            const response = await fetch(
                'http://127.0.0.1:3040/api/pp/obterPlaneamento/?dataentrega='+data.getFullYear()+''+mes+''+dia,
                {method: 'GET',
                 headers: {'Content-Type': 'application/json'},
                })
                .then(response => response.json())
                .then((json) => {
                   planoJson = json;
                });

                var arr = [];

                for (let index = 0; planoJson.camiao[index] != undefined; index++) {
                    arr.push(planoJson.camiao[index]);
                }
                return arr;


        } catch(err) {
            console.error('Fetch error:', err, 'request:');
        }
    }

    public async getPlanoEntregasMenorTempo(data: Date): Promise<string[]> {
        var dia:string;
        var mes:string;
        if(data.getDate() < 10){
             dia = '0'+data.getDate();
        }else{
            dia = ''+data.getDate();
        }

        if(data.getMonth()+1 <10){
            mes = '0'+data.getMonth()+1;
        }else{
            mes = ''+(data.getMonth()+1);
        }

        try {
            var planoJson;
            const response = await fetch(
                'http://127.0.0.1:3040/api/pp/obterPlaneamento/menorTempo/?dataentrega='+data.getFullYear()+''+mes+''+dia,
                {method: 'GET',
                 headers: {'Content-Type': 'application/json'},
                })
                .then(response => response.json())
                .then((json) => {
                   planoJson = json;
                });

                var arr = [];
                console.log(planoJson);

                for (let index = 0; planoJson.camiao[index] != undefined; index++) {
                    arr.push(planoJson.camiao[index]);
                }
                return arr;


        } catch(err) {
            console.error('Fetch error:', err, 'request:');
        }
        
    }
    public async getPlanoEntregasMaiorMassa(data: Date): Promise<string[]> {
        var dia:string;
        var mes:string;
        if(data.getDate() < 10){
             dia = '0'+data.getDate();
        }else{
            dia = ''+data.getDate();
        }

        if(data.getMonth()+1 <10){
            mes = '0'+data.getMonth()+1;
        }else{
            mes = ''+(data.getMonth()+1);
        }

        try {
            var planoJson;
            const response = await fetch(
                'http://127.0.0.1:3040/api/pp/obterPlaneamento/maiorMassa/?dataentrega='+data.getFullYear()+''+mes+''+dia,
                {method: 'GET',
                 headers: {'Content-Type': 'application/json'},
                })
                .then(response => response.json())
                .then((json) => {
                   planoJson = json;
                });

                var arr = [];
                console.log(planoJson);

                for (let index = 0; planoJson.camiao[index] != undefined; index++) {
                    arr.push(planoJson.camiao[index]);
                }
                return arr;


        } catch(err) {
            console.error('Fetch error:', err, 'request:');
        }
        
    }
    public async getPlanoEntregasCombinado(data: Date): Promise<string[]> {
        var dia:string;
        var mes:string;
        if(data.getDate() < 10){
             dia = '0'+data.getDate();
        }else{
            dia = ''+data.getDate();
        }

        if(data.getMonth()+1 <10){
            mes = '0'+data.getMonth()+1;
        }else{
            mes = ''+(data.getMonth()+1);
        }

        try {
            var planoJson;
            const response = await fetch(
                'http://127.0.0.1:3040/api/pp/obterPlaneamento/combinada/?dataentrega='+data.getFullYear()+''+mes+''+dia,
                {method: 'GET',
                 headers: {'Content-Type': 'application/json'},
                })
                .then(response => response.json())
                .then((json) => {
                   planoJson = json;
                });

                var arr = [];
                console.log(planoJson);

                for (let index = 0; planoJson.camiao[index] != undefined; index++) {
                    arr.push(planoJson.camiao[index]);
                }
                return arr;


        } catch(err) {
            console.error('Fetch error:', err, 'request:');
        }
    }


    public async getPaginado(page: number): Promise<PlanoEntrega[]> {
        const query = { };
        const skip = this.limit * (page - 1);
        const PlanoEntregaRecord = await this.PlanoEntregaSchema.find(query as FilterQuery<IPlanoEntregaPersistence & Document>).skip(skip).limit(this.limit);
        
        if (PlanoEntregaRecord != null) {
            let planos: Array<PlanoEntrega> = [];
            PlanoEntregaRecord.forEach(async function (planoRecord) {
                planos.push(await PlanoEntregaMap.toDomain(planoRecord))
            })
            return planos
        }
        else
            return null;
    }

    //=============== Get Planeamento de Frota Completa ===========================
    public async getFrotaCompleta(data: Date): Promise<string[]> {
        var dia:string;
        var mes:string;
        if(data.getDate() < 10){
             dia = '0'+data.getDate();
        }else{
            dia = ''+data.getDate();
        }

        if(data.getMonth()+1 <10){
            mes = '0'+data.getMonth()+1;
        }else{
            mes = ''+(data.getMonth()+1);
        }
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });


        var planeamentoFrotaJson;
        const response = await fetch(
            'http://127.0.0.1:3060/api/pp/obterPlaneamentoFrotaCompleta/?dataentrega=20230109',
            {method: 'GET',
                headers: {'Content-Type': 'application/json',
                 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjYWxvczEyMyIsImZpcnN0TmFtZSI6IkNhcmxvcyIsInJvbGUgIjoiYWRtaW4iLCJqdGkiOiIyYzQwNGFkYi0zYjRkLTRkMDItOWFkZi0zOGRjNDQ1OGUzOWYiLCJleHAiOjE3MDM4NzU3NTEsImlzcyI6IkVsZXRyaWNHTyIsImF1ZCI6IkVsZXRyaWNHTyJ9.gFrpl8PUeW5BxTR17tBN88uaTlk98Z1Hf1lI2QMM-mQ'},
            })
            .then(response => response.json())
             .then((json) => {
                planeamentoFrotaJson = json;
            });
            
            var arr2= [];
            for (let index = 0; planeamentoFrotaJson[index] != undefined; index++) {
                arr2.push(planeamentoFrotaJson[index]);
            }
            console.log(planeamentoFrotaJson);
        
            return arr2;
    }


    //=======================  Get Armazens, Camioes e entregas ====================================
    public async getArmazens(): Promise<string[]> {
        var armazensJson;

        const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });

        var URL = config.gestaoArmazensURL + config.gestaoArmazensAPIS.armazens + "/";
        const response = await fetch(URL, {
            // Adding method type
            method: "GET",
            agent: httpsAgent,
            headers: {'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjYWxvczEyMyIsImZpcnN0TmFtZSI6IkNhcmxvcyIsInJvbGUgIjoiYWRtaW4iLCJqdGkiOiIyYzQwNGFkYi0zYjRkLTRkMDItOWFkZi0zOGRjNDQ1OGUzOWYiLCJleHAiOjE3MDM4NzU3NTEsImlzcyI6IkVsZXRyaWNHTyIsImF1ZCI6IkVsZXRyaWNHTyJ9.gFrpl8PUeW5BxTR17tBN88uaTlk98Z1Hf1lI2QMM-mQ'}
        })
        .then(response => response.json())
        .then((json) => {
            armazensJson = json;
        });;
           
        var arr = [];
        for (let index = 0; index < armazensJson.length; index++) {
            var armazem = JSON.stringify(armazensJson[index]);
            arr.push(armazem);
        }
        return arr;
    }

    public async getEntregas(data: Date): Promise<string[]> {
        var dia: string;
        var mes: string;
        var ano = data.getFullYear();

        if(data.getDate() < 10){
             dia = '0'+data.getDate();
        }else{
            dia = ''+data.getDate();
        }

        if(data.getMonth()+1 <10){
            mes = ''+data.getMonth()+1;
        }else{
            mes = ''+(data.getMonth()+1);
        }
        var entregasJson;

        const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });
      
        const datastring = ano +""+mes+""+dia;
  
        var URL = config.gestaoArmazensURL + config.gestaoArmazensAPIS.entregas + "/data/data1="+ datastring + "&data2=" + datastring;
        const response = await fetch(URL, {
            // Adding method type
            method: "GET",
            agent: httpsAgent,
            headers: {'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjYWxvczEyMyIsImZpcnN0TmFtZSI6IkNhcmxvcyIsInJvbGUgIjoiYWRtaW4iLCJqdGkiOiIyYzQwNGFkYi0zYjRkLTRkMDItOWFkZi0zOGRjNDQ1OGUzOWYiLCJleHAiOjE3MDM4NzU3NTEsImlzcyI6IkVsZXRyaWNHTyIsImF1ZCI6IkVsZXRyaWNHTyJ9.gFrpl8PUeW5BxTR17tBN88uaTlk98Z1Hf1lI2QMM-mQ'}
        })
        .then(response => response.json())
        .then((json) => {
            entregasJson = json;
        });;
           
        var arr = [];
        for (let index = 0; index < entregasJson.length; index++) {
            var entrega = JSON.stringify(entregasJson[index]);
            arr.push(entrega);
        }
    
        return arr;
    }

    public async getCamioes(): Promise<string[]> {
        var camioesJson;

        const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });

        const response = await fetch(
            "http://localhost:3000/api/camiao/",
            {method: 'GET',
             headers: {'Content-Type': 'application/json',
              'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjYWxvczEyMyIsImZpcnN0TmFtZSI6IkNhcmxvcyIsInJvbGUgIjoiYWRtaW4iLCJqdGkiOiIyYzQwNGFkYi0zYjRkLTRkMDItOWFkZi0zOGRjNDQ1OGUzOWYiLCJleHAiOjE3MDM4NzU3NTEsImlzcyI6IkVsZXRyaWNHTyIsImF1ZCI6IkVsZXRyaWNHTyJ9.gFrpl8PUeW5BxTR17tBN88uaTlk98Z1Hf1lI2QMM-mQ'},
            })
            .then(response => response.json())
            .then((json) => {
                camioesJson = json;
            });
           
        var arr = [];
        for (let index = 0; index < camioesJson.length; index++) {
            var entrega = JSON.stringify(camioesJson[index]);
            arr.push(entrega);
        }
     
        return arr;
    }
}
