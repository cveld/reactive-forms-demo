import { JaNeeEnum, StappenVariantEnum } from '../enums';
import { IDate, IDateModel } from 'src/app/lib/date-picker/interfaces';

export class UwGegevens {
    meerling: boolean;
    stappenVariant: StappenVariantEnum;
    datumVermoedelijkeBevalling: IDateModel;
    datumBevalling: IDateModel;
    kindOverleden: boolean;
    bevallen: JaNeeEnum;
    keuzeStartUitkering: string;
    datumUitkering: IDateModel;
    intentieverklaring: string;
}
