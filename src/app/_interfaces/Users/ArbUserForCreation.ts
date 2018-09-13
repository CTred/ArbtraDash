export interface ArbUserForCreation {
    // id: string;
    avatar?: string; //address to the user uploaded photo
    firstName: string;
    lastName: string;
    // alias: string; //how you would like to be called
    userType?: string; // TODO enum: Person OR Entity
    email: string; // inform as many as wanted
    password: string; // TODO: password to be stored as a Hash at back-end
    dateCreated: number;
    dateTerminated?: number;

    accountArbiter?: string // GUID
    accountEntityRep?: string // GUID
    accountPerson?: string // GUID
    accountResearch?: string // GUID
    // TODO: Other accounts?
}