export default interface  IArmazemRequests{
     getStatusById(ArmazemId: string): Promise<any>;
}