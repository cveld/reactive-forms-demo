import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { IServerOperationErrorAction, IServerOperationResultAction } from 'edv-ngrx-server-operation';
import { VerstuurFormulierModel } from '../../../shared/models/verstuur-formulier.model';
import { StappenVariantEnum } from 'src/app/shared/enums';

// tslint:disable-next-line:no-namespace
export namespace FormulierActions {

    export const VERSTUUR = '[Formulier] VERSTUUR';
    export const VERSTUUR_COMPLETE = '[Formulier] VERSTUUR_COMPLETE';
    export const VERSTUUR_ERROR = '[Formulier] VERSTUUR_ERROR';
    export const VERSTUUR_RESET = '[Formulier] VERSTUUR_RESET';

    /** Action triggered when verstuuring a Formulier */
    export class Verstuur implements Action {
        public readonly type = VERSTUUR;
        public readonly payload: {
            data: StappenVariantEnum;
        };

        constructor(data: StappenVariantEnum) {
            this.payload = {
                data
            };
        }
    }

    /** Action triggered when verstuuring Formulier completes */
    export class VerstuurComplete implements Action {
        public readonly type = VERSTUUR_COMPLETE;
    }

    /** Action triggered when verstuuring Formulier results in an error */
    export class VerstuurError implements Action, IServerOperationErrorAction {
        public readonly type = VERSTUUR_ERROR;
        public readonly payload: {
            httpError?: HttpErrorResponse;
        };

        constructor(httpError?: HttpErrorResponse) {
            this.payload = {
                httpError
            };
        }
    }

    /** Action to reset mail operation */
    export class VerstuurReset implements Action {
        public readonly type = VERSTUUR_RESET;
    }

    export type Actions =
        | Verstuur
        | VerstuurComplete
        | VerstuurError
        | VerstuurReset;
}
