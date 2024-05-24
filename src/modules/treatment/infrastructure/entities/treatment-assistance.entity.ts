import { BeforeInsert, Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TreatmentEntity } from "./treatment.entity";
import { TreatmentSpecialityEntity } from "./treatment-speciality.entity";
import { UserEntity } from "src/modules/user/infrastructure/entities/user.entity";

@Entity('treatment_assistances')
export class TreatmentAssistanceEntity {

    @PrimaryGeneratedColumn('uuid')
    @Index()
    id: string;

    @Column({
        type: 'date',
        nullable: true,
    })
    date_appointment: string;

    @Column({
        type: 'date',
        nullable: false
    })
    date_care: string;

    @Column({
        type: 'boolean',
        default: true,
        nullable: false
    })
    status: boolean;

    @CreateDateColumn({
        name: 'created_at',
        nullable: false
    })
    created_at: Date;

    @ManyToOne(() => TreatmentEntity)
    @JoinColumn({ name: 'treatment_id' })
    treatment: TreatmentEntity;

    @ManyToOne(() => TreatmentSpecialityEntity)
    @JoinColumn({ name: 'treatment_speciality_id' })
    treatment_speciality: TreatmentSpecialityEntity;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'profesional_id' })
    profesional: UserEntity;

    @BeforeInsert()
    setTimestamp() {
        this.created_at = new Date();
    }
}