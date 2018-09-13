import { ArbUser } from './Users/ArbUser.interface';
export interface ArbRegDocForCreation {
    // Registered document general description and information
    // id: string;
    name: string;
    documentParties: string[];
    registeredDate: number;
    duration: number;
    expiryDate: Date; // If duration == 0, expiryDate = 90 days

    // Arbitration Pre-established Conditions (Process Automatic Builder)
    arbiterNumb?: number;
    arbiterRank?: number;
    arbiterBadge?: string[]; 
    processTerm?: number;
    processAdditionalTerm?: number;
    
    // PDF reference and access type
    pointer?: string; // where the PDF file is actually located in db
    disclosure: string; // may be the following: 1. 'NA' (document and metadata are registered, but the parties hold the pdf privately); 2. 'Private' (available only to parties); 3. 'Searchable' (possible disclose to third parties, upon authorisation of the parties); 4. 'Public'

}