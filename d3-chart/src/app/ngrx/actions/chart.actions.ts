import { Action } from "@ngrx/store";
import { Series, ChartConfiguration } from "src/app/model/chart-params";




export const CHANGE_DATA = '[Chart] Change data';
export const CHANGE_CONFIG = '[Chart] Change config';

/**
 * Action déclenchée lorsque des données sont modifiées
 */
export class ChangeDataAction implements Action {
    readonly type = CHANGE_DATA;
    constructor(public data: Series) {}
}
/**
 * Action déclenchée lorsque la config sont modifiées
 */
export class ChangeConfigAction implements Action {
    readonly type = CHANGE_CONFIG;
    constructor(public data: ChartConfiguration) {}
}

export type All = ChangeConfigAction
| ChangeDataAction;