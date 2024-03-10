import { BaseRepository } from "src/common/repository/base.repository";
import { Packet } from "../models/packet.model";

export interface PacketsRepository extends BaseRepository<Packet> { }