import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MassiveUploadEntity } from "./massive-upload.entity";

@Entity('massive_upload_item')
export class MassiveUploadItemEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: 'longtext',
        nullable: true
    })
    item: string;

    @Column({
        type: 'text',
        nullable: true
    })
    reason: string;

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

    @ManyToOne(() => MassiveUploadEntity, (massive_upload) => massive_upload.massive_upload_items)
    @JoinColumn({ name: 'massive_upload_id' })
    massive_upload: MassiveUploadEntity;

    @BeforeInsert()
    setTimestamp() {
        this.created_at = new Date();
    }
}