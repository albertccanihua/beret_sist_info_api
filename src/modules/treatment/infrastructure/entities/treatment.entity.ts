import { ManagementTypeEntity } from "src/modules/general/infrastructure/entities/management-type.entity";
import { PacketEntity } from "src/modules/packet/infrastructure/entities/packet.entity";
import { PatientEntity } from "src/modules/patient/infrastructure/entities/patient.entity";
import { UserEntity } from "src/modules/user/infrastructure/entities/user.entity";
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TreatmentSpecialityEntity } from "./treatment-speciality.entity";
import { TreatmentAssistanceEntity } from "./treatment-assistance.entity";

@Entity('treatments')
export class TreatmentEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_creator_id' })
    user_creator: UserEntity;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    @Index()
    code: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true
    })
    name: string;

    @Column({
        type: 'boolean',
        default: true,
        nullable: false
    })
    status: boolean;

    @Column({
        type: 'double',
        default: 0,
        nullable: true
    })
    acceptance_rate: number;

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

    @ManyToOne(() => PacketEntity)
    @JoinColumn({ name: 'packet_id' })
    packet: PacketEntity;

    @ManyToOne(() => PatientEntity)
    @JoinColumn({ name: 'patient_id' })
    patient: PatientEntity;

    @ManyToOne(() => ManagementTypeEntity)
    @JoinColumn({
        name: 'type_status_treatment_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_mt_t_type_status_treatment_id'
    })
    type_status_treatment: ManagementTypeEntity;

    @OneToMany(type => TreatmentSpecialityEntity, treatment_specialities => treatment_specialities.treatment)
    treatment_specialities: TreatmentSpecialityEntity[];

    @OneToMany(type => TreatmentAssistanceEntity, treatment_assistances => treatment_assistances.treatment)
    treatment_assistances: TreatmentAssistanceEntity[];

    @BeforeInsert()
    setTimestamp() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }
}