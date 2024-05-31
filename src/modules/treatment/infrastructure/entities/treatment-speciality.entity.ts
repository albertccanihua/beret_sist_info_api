import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TreatmentEntity } from "./treatment.entity";
import { SpecialityEntity } from "src/modules/speciality/infrastructure/entities/speciality.entity";
import { TreatmentAssistanceEntity } from "./treatment-assistance.entity";

@Entity('treatment_specialities')
export class TreatmentSpecialityEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: 'integer',
        nullable: false
    })
    sessions: number;

    @Column({
        type: 'integer',
        default: 0,
        nullable: false
    })
    sessions_taken: number;

    @ManyToOne(() => TreatmentEntity)
    @JoinColumn({ name: 'treatment_id' })
    treatment: TreatmentEntity;

    @ManyToOne(() => SpecialityEntity)
    @JoinColumn({ name: 'speciality_id' })
    speciality: SpecialityEntity;

    @OneToMany(type => TreatmentAssistanceEntity, treatment_assistances => treatment_assistances.treatment_speciality)
    treatment_assistances: TreatmentAssistanceEntity[];

}