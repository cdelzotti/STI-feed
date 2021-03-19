export interface Event {
    _id? : string,
    localisation? : string,
    impact? : string,
    dateDebut? : string,
    dateFin? : string,
    source? : string,
    relevant? : boolean,
    message? : string,
    type? : string,
    info? : string
    attachedFile?: string
}