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
        unique: true,
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
        enum: RolesEnum
    })
    role: RolesEnum

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

    @ManyToOne(() => ManagementTypeEntity)
    @JoinColumn({ name: 'type_document_id' })
    type_document_id: ManagementTypeEntity;

    @ManyToOne(() => ManagementTypeEntity)
    @JoinColumn({ name: 'type_gender_id' })
    type_gender_id: ManagementTypeEntity;

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