import { PacketSpecialityEntity } from "src/modules/packet/infrastructure/entities/packet-speciality.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('specialities')
export class SpecialityEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'uuid',
        nullable: false
    })
    user_id: string;

    @Column({
        type: 'varchar',
        length: 30,
        nullable: false
    })
    code: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    name: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    description: string;

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

    @OneToMany(type => PacketSpecialityEntity, packet_specialities => packet_specialities.packet)
    packet_specialities: PacketSpecialityEntity[];
}