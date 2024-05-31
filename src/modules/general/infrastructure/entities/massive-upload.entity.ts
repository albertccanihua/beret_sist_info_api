import { UserEntity } from "src/modules/user/infrastructure/entities/user.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MassiveUploadItemEntity } from "./massive-upload-item.entity";

@Entity('massive_upload')
export class MassiveUploadEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_creator_id' })
    user_creator: number;

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

    @OneToMany(type => MassiveUploadItemEntity, massive_upload_items => massive_upload_items.massive_upload)
    massive_upload_items: MassiveUploadItemEntity[];

    @BeforeInsert()
    setTimestamp() {
        this.created_at = new Date();
    }
}