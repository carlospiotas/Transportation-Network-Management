
import IArmazemRepo from '../services/IRepos/IArmazemRepo';
import config from "../../config";
import { Service, Inject } from 'typedi';
import IArmazemRequests from '../dataschema/IArmazemRequests';
const https = require('https');

@Service()
export default class ArmazemRepo implements IArmazemRepo {



    constructor(@Inject(config.requests.armazens.name) private ArmazemRequests: IArmazemRequests) {


    }


    public async exists(ArmazemId: string): Promise<boolean> {
        const response = await this.ArmazemRequests.getStatusById(ArmazemId);
        const status = response;
        let str: String = (status);
        let str2: String = "200";

        return str == str2;

    }

}