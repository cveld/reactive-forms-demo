import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from 'edv-configuration';
import { Observable } from 'rxjs';
import { VerstuurFormulierModel } from '../models/verstuur-formulier.model';
// import { CvPart, FileFormat } from '../enums';
// import { ActivationResult, GetCvResult, MailCv } from '../models';

/**
 * Service voor het versturen van het formulier.
 */
@Injectable({
  providedIn: 'root'
})
export class VersturenService {
  private baseUrl: string;

  constructor(private readonly http: HttpClient, private readonly configurationService: ConfigurationService) {
    this.baseUrl = `${this.configurationService.getValue('ziekEnBetermelderApiUri')}/verzend`;
  }

  /** verzend het formulier */
  public verstuurFormulier(data: VerstuurFormulierModel): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/`, data);
  }
}
