import { DeepPartial, Repository } from "typeorm";
import { RequestBroker } from "../packages/request-broker/request-broker";
import { IQueryBuilderPaginatedResponse } from "../packages/request-broker/interfaces/query-builder-response-paginated.interface";
import { BaseRepository } from "./base.repository";
import { IQueryBuilderRequest } from "../packages/request-broker/interfaces/query-builder-request.interface";

export class BaseRepositoryImpl<Entity, Model> implements BaseRepository<Model>{

    protected requestBroker: RequestBroker<Entity>;

    constructor(
        private repository: Repository<Entity>,
        private alias: string,
        private filters: (query: IQueryBuilderRequest<Entity>, args: any) => void
    ) {
        this.requestBroker = new RequestBroker<Entity>(repository);
    }

    async show(id: any): Promise<Model | any> {
        const record: Entity | null = await this.requestBroker.queryBuilder(this.alias)
            .setArgs({ id })
            .applyFilters((query, args) => this.filters(query, args))
            .getInstance()
            .getOne();

        if (!record) return null;
        return record;
    }

    async get(args: any): Promise<Model[] | any> {
        const packets: Entity[] | [] = await this.requestBroker.queryBuilder(this.alias)
            .setArgs(args)
            .applyFilters((query, args) => this.filters(query, args))
            .getInstance()
            .getMany();
        return packets;
    }

    async list(args: any): Promise<IQueryBuilderPaginatedResponse<Entity>> {
        const packets: IQueryBuilderPaginatedResponse<Entity> = await this.requestBroker.queryBuilder(this.alias)
            .setArgs(args)
            .applyFilters((query, args) => this.filters(query, args))
            .getManyPaginated(args.page, args.limit);
        return packets;
    }

    async create(data: Model | any): Promise<Model | any> {
        const record: Entity = this.repository.create(data as DeepPartial<Entity>);
        await this.repository.save(record);
        return record;
    }

    async update(id: any, data: Model): Promise<Model | any> {
        const record: Entity = await this.repository.preload({ id, ...data } as DeepPartial<Entity>);

        if (!record) return null;

        await this.repository.save(record);
        return record;
    }

    async delete(id: any): Promise<Model | any> {
        const record: Entity | null = await this.show(id);
        if (!record) return null;

        if (record.hasOwnProperty('deleted_at')) {
            await this.repository.softRemove(record as DeepPartial<Entity>);
        } else {
            await this.repository.remove(record);
        }

        return record;
    }
}