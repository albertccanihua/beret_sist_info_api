import { RolesEnum } from "src/common/enum/roles.enum";
import { ManagementTypeEntity } from "src/modules/general/infrastructure/entities/management-type.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 30,
        unique: true,
        nullable: false
    })
    document_number: string;

    @Column({
        type: 'date',
        nullable: true
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
        length: 50,
        nullable: false
    })
    paternal_surname: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true
    })
    maternal_lastname: string;

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
        type: 'varchar',
        length: 100,
        unique: true,
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

    @ManyToOne(() => ManagementTypeEntity)
    @JoinColumn({ name: 'type_document_id' })
    type_document: ManagementTypeEntity;

    @ManyToOne(() => ManagementTypeEntity)
    @JoinColumn({ name: 'type_gender_id' })
    type_gender: ManagementTypeEntity;

    @ManyToOne(() => ManagementTypeEntity)
    @JoinColumn({ name: 'type_role_id' })
    type_role: ManagementTypeEntity;

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