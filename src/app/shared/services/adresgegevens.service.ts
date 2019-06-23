import { Injectable } from '@angular/core';
//import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdresModel } from '../../shared/models/adres-model';
import { ConfigurationService } from 'edv-configuration';

@Injectable()

export class AdresgegevensService {

    private readonly baseUrl: string;

    constructor(private readonly http: HttpClient, private readonly configurationService: ConfigurationService) {
        this.baseUrl = `${this.configurationService.getValue('ziekEnBetermelderApiUri')}`;
    }

    getAdresgegevens(): Observable<AdresModel> {
        return this.http.get<AdresModel>((`${this.baseUrl}/adres`));
    }
}
