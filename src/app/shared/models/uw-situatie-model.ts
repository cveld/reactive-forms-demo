import { WWSituatieEnum } from '../enums/wwsituatie.enum';
import { WWofZelfstandigEnum } from '../enums/wwofzelfstandig.enum';
import { JaNeeEnum } from '../enums/janee.enum';

export class UwSituatieModel {
    public wwsituatie: WWSituatieEnum;
    public zelfstandige: JaNeeEnum;
    public wwofzelfstandig: WWofZelfstandigEnum;
    public meerling: JaNeeEnum;
}
