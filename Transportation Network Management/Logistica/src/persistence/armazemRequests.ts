import IArmazemRequests from '../dataschema/IArmazemRequests';
import fetch from 'node-fetch';
import config from "../../config";
const https = require('https');

export default class ArmazemRequests implements IArmazemRequests {

    constructor() {
    }


    public async getStatusById(ArmazemId: string): Promise<any> {

        const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });
        var URL = config.gestaoArmazensURL + config.gestaoArmazensAPIS.armazens + "/" + ArmazemId;
        const response = await fetch(URL, {

            // Adding method type
            method: "GET",
            agent: httpsAgent,
            headers: {'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjYWxvczEyMyIsImZpcnN0TmFtZSI6IkNhcmxvcyIsInJvbGUgIjoiYWRtaW4iLCJqdGkiOiIyYzQwNGFkYi0zYjRkLTRkMDItOWFkZi0zOGRjNDQ1OGUzOWYiLCJleHAiOjE3MDM4NzU3NTEsImlzcyI6IkVsZXRyaWNHTyIsImF1ZCI6IkVsZXRyaWNHTyJ9.gFrpl8PUeW5BxTR17tBN88uaTlk98Z1Hf1lI2QMM-mQ'}
        });

        return await response.status;
    }

}
