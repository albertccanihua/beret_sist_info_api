import { UserEntity } from "src/modules/user/infrastructure/entities/user.entity";
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('treatment_imports')
export class TreatmentImportEntity {

    @PrimaryGeneratedColumn('uuid')
    @Index()
    id: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_creator_id' })
    @Index()
    user_creator: UserEntity;

    @Column({
        type: 'varchar',
        length: 150,
        nullable: true
    })
    filename: string;

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
    @Index()
    created_at: Date;

}