import { ArbUser } from './Users/ArbUser.interface';
export interface ArbPaper {
    paperId: string;
    author: string[];
    body: string;
    attachments: string; // TODO: check if format is correct
    decision: boolean;
    adminRuling: boolean;
}