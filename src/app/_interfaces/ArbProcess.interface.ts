import { ArbPaper } from './ArbPaper.interface';
import { ArbUser } from "./Users/ArbUser.interface";
import { ArbRegDoc } from "./ArbRegDoc.interface";

export interface ArbProcess {
    plaintiffs: string[]; // ArbUser[]
    plaintiffsRep?: string[]; // ArbUser[]
    defendants: string[]; // ArbUser[]
    defendantsRep?: string[]; // ArbUser[]

    arbRegDocRef: string; // ArbRegDoc[]
    processRef?: string[]; // ArbProcess[]

    arbiterNumb: number; // number of arbiters
    arbiterRank: number;
    arbiterBadge: string; //TODO -> talvez ajustar de 'string' para um objeto 'tag/especialidade'

    processId: string; //TODO -> na verdade é um GUID
    processAlias?: string;
    processInit: number;
    processEnd?: Date;
    processTerm: number;
    processAdditionalTerm: number;
    processCost: number;

    processDocumentsArray: ArbPaper[];
    processDocumentsDecisions?: ArbPaper[];
      
}
