import { ObjectID } from 'typeorm';
// A classical response from the Control Module
export class ControlResponse{
    status : string; // Details about the process
    error : boolean; // Is there an error
}