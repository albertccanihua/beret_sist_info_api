import { BaseRepository } from "src/common/repository/base.repository";
import { Patient } from "../models/patient.model";

export interface PatientsRepository extends BaseRepository<Patient> { }