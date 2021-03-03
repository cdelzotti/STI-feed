export interface Message {
    _id?: string;
    dateDebut?: string;
    dateFin?: string;
    title?: string;
    content?: string;
    type?: string;
    published?: boolean;
    relatedEvent?: string;
    relatedType?: string;
}
