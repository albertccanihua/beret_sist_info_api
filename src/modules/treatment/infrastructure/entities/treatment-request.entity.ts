import { PatientEntity } from "src/modules/patient/infrastructure/entities/patient.entity";
import { UserEntity } from "src/modules/user/infrastructure/entities/user.entity";
import { CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('treatment_requests')
export class TreatmentRequestEntity {

    @PrimaryGeneratedColumn('uuid')
    @Index()
    id: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_creator_id' })
    @Index()
    user_creator: UserEntity;

    @CreateDateColumn({
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false
    })
    @Index()
    created_at: Date;

    @ManyToOne(() => PatientEntity)
    @JoinColumn({ name: 'patient_id' })
    @Index()
    patient: PatientEntity;
}