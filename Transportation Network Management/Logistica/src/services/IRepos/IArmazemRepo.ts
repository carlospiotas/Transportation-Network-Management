

export default interface IArmazemRepo {

  exists(ArmazemId: string): Promise<boolean>;
}