// A classical response from the Control Module
export class ControlResponse{
    status : string; // Details about the process
    error : boolean; // Is there an error
    _id? : string; // Id of a just-added object
}