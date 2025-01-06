import { ManagementTypeEntity } from "src/modules/general/infrastructure/entities/management-type.entity";
import { UserEntity } from "src/modules/user/infrastructure/entities/user.entity";
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('patients')
export class PatientEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_creator_id' })
    user_creator: UserEntity;

    @Column({
        type: 'varchar',
        length: 30,
        unique: true,
        nullable: false
    })
    document_number: string;

    @Column({
        type: 'varchar',
        length: 50,
        unique: false,
        nullable: false,
    })
    medical_history: string;

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
        type: 'boolean',
        default: true,
        nullable: false
    })
    status: boolean;

    @ManyToOne(() => ManagementTypeEntity)
    @JoinColumn({
        name: 'type_document_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_mt_p_type_document_id'
    })
    type_document: ManagementTypeEntity;

    @ManyToOne(() => ManagementTypeEntity)
    @JoinColumn({
        name: 'type_gender_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_mt_p_type_gender_id'
    })
    type_gender: ManagementTypeEntity;

    @ManyToOne(() => ManagementTypeEntity)
    @JoinColumn({
        name: 'type_financing_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_mt_p_type_financing_id'
    })
    type_financing: ManagementTypeEntity;

    @CreateDateColumn({
        name: 'created_at',
        nullable: false
    })
    created_at: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        nullable: false
    })
    updated_at: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        nullable: true
    })
    deleted_at: Date;

    @BeforeInsert()
    setTimestamp() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }
}