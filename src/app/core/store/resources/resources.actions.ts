import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { IServerOperationErrorAction, IServerOperationResultAction } from 'edv-ngrx-server-operation';
import { IResourceDictionary } from '../../../shared/models/resources-dictionary';

// tslint:disable-next-line:no-namespace
export namespace ResourcesActions {
  export const LOAD = '[Resources] LOAD';
  export const LOAD_FROM_CACHE = '[Resources] LOAD_FROM_CACHE';
  export const LOAD_COMPLETE = '[Resources] LOAD_COMPLETE';
  export const LOAD_ERROR = '[Resources] LOAD_ERROR';

  /**
   * Action to load the current user's indication AG
   */
  export class Load implements Action {
    public readonly type = LOAD;
  }

  /**
   * Action to load the current user's indication AG From cache if exists
   */
  export class LoadFromCache implements Action {
    public readonly type = LOAD_FROM_CACHE;
  }

  /**
   * Action triggered when load of indication AG is complete
   */
  export class LoadComplete implements Action, IServerOperationResultAction<IResourceDictionary> {
    public readonly type = LOAD_COMPLETE;
    public readonly payload: { data: IResourceDictionary };

    constructor(Resources: IResourceDictionary) {
      this.payload = {
        data: Resources
      };
    }
  }

  /**
   * Action triggered when load of indication AG resulted in an error
   */
  export class LoadError implements Action, IServerOperationErrorAction {
    public readonly type = LOAD_ERROR;
    public readonly payload: {
      httpError?: HttpErrorResponse;
    };

    constructor(httpError?: HttpErrorResponse) {
      this.payload = {
        httpError
      };
    }
  }

  export type Actions = Load | LoadComplete | LoadError | LoadFromCache;
}
