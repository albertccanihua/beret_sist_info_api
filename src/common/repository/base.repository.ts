export interface BaseRepository<T> {
    show(id: any): Promise<T>;
    get(args: any): Promise<T[]>;
    list(args: any): Promise<any>;
    create(data: T): Promise<T>;
    update(id: any, data: T): Promise<T>;
    delete(id: any): Promise<T>;
}