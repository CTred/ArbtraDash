export interface ArbPaperForCreation {
    author: string[];
    body: string;
    attachments: string; // TODO: check if format is correct
    decision: boolean;
    adminRuling: boolean;
}