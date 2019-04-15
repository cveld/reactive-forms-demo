import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from '../../lib/Uwv.eDv.Angular.Configuration';
import { Observable } from 'rxjs';
import { IResourceDictionary } from '../models/resources-dictionary';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
    private baseUrl: string;

    constructor(private readonly http: HttpClient, private readonly configurationService: ConfigurationService) {
        this.baseUrl = `${this.configurationService.getValue('onderhoudenCvApiUri')}/resources`;
      }

      /** Gets the indication whether AG possibilities are enabled for the current user  */
      public get(): Observable<IResourceDictionary> {
        return this.http.get<IResourceDictionary>(this.baseUrl);
      }
}
