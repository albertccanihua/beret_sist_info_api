import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('management_types')
export class ManagementTypeEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 20,
        nullable: true
    })
    code: string;

    @Column({
        type: 'varchar',
        length: 200,
        nullable: false
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 250,
        nullable: true
    })
    description: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    data: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    type: string;

    @Column({
        type: 'boolean',
        default: true,
        nullable: false
    })
    status: boolean;

    @CreateDateColumn({
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false
    })
    created_at: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false
    })
    updated_at: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        nullable: true
    })
    deleted_at: Date;
}