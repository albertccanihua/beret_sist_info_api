import { DocumentTypesEnum } from "src/common/enum/document-types.enum";
import { GendersEnum } from "src/common/enum/genders.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: DocumentTypesEnum,
        nullable: false
    })
    document_type: DocumentTypesEnum;

    @Column({
        type: 'varchar',
        length: 30,
        nullable: false
    })
    document_number: string;

    @Column({
        type: 'date',
        nullable: false
    })
    dob: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    lastname: string;

    @Column({
        type: 'varchar',
        length: 150,
        nullable: true
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 30,
        nullable: true
    })
    phone_number: string;

    @Column({
        type: 'enum',
        enum: GendersEnum
    })
    gender: GendersEnum

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    username: string;

    @Column({
        type: 'varchar',
        length: 250,
        nullable: false
    })
    password: string;

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