import { PatientEntity } from "src/modules/patient/infrastructure/entities/patient.entity";
import { UserEntity } from "src/modules/user/infrastructure/entities/user.entity";
import { BeforeInsert, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('treatment_requests')
export class TreatmentRequestEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_creator_id' })
    @Index()
    user_creator: UserEntity;

    @CreateDateColumn({
        name: 'created_at',
        nullable: false
    })
    @Index()
    created_at: Date;

    @ManyToOne(() => PatientEntity)
    @JoinColumn({ name: 'patient_id' })
    @Index()
    patient: PatientEntity;

    @BeforeInsert()
    setTimestamp() {
        this.created_at = new Date();
    }
}