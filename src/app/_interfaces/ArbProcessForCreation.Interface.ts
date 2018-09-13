import { ArbPaper } from './ArbPaper.interface';
import { ArbUser } from "./Users/ArbUser.interface";
import { ArbRegDoc } from "./ArbRegDoc.interface";
import { ArbProcess } from './ArbProcess.interface';

export interface ArbProcessForCreation {
    arbRegDocRef: string; // ArbRegDoc[]
    plaintiffs: string[]; // ArbUser[]
    plaintiffsRep?: string[]; // ArbUser[]
    defendants: string[]; // ArbUser[]
    // defendantsRep?: string[]; // ArbUser[]

    processAlias?: string;
    arbiterNumb: number; // number of arbiters
    arbiterRank: number;
    arbiterBadge: string; //TODO -> talvez ajustar de 'string' para um objeto 'tag/especialidade'

//    processId: string;
    processTerm: number;
    processAdditionalTerm: number;
    processRef?: string[]; // ArbProcess[]

    processInit: number;
    processEnd?: Date;
    processCost: number;

//    processDocumentsArray: ArbPaper[];
    processDocumentsDecisions?: ArbPaper[];
}
