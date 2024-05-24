import { IsOptional, IsString } from "class-validator";

export class ObjectForUploadingDto {

    @IsOptional()
    id: string;

    @IsOptional()
    id_cita: string;

    @IsOptional()
    anio: string;

    @IsOptional()
    mes: string;

    @IsOptional()
    dia: string;

    @IsOptional()
    fecha_atencion: string;

    @IsOptional()
    lote: string;

    @IsOptional()
    num_pag: string;

    @IsOptional()
    num_reg: string;

    @IsOptional()
    id_ups: string;

    @IsOptional()
    descripcion_ups: string;

    @IsOptional()
    descripcion_sector: string;

    @IsOptional()
    descripcion_disa: string;

    @IsOptional()
    descripcion_red: string;

    @IsOptional()
    descripcion_microred: string;

    @IsOptional()
    codigo_unico: string;

    @IsOptional()
    nombre_establecimiento: string;

    @IsOptional()
    abrev_tipo_doc_paciente: string;

    @IsOptional()
    numero_documento_paciente: string;

    @IsOptional()
    apellido_paterno_paciente: string;

    @IsOptional()
    apellido_materno_paciente: string;

    @IsOptional()
    nombres_paciente: string;

    @IsOptional()
    fecha_nacimiento_paciente: string;

    @IsOptional()
    genero: string;

    @IsOptional()
    id_etnia: string;

    @IsOptional()
    descripcion_etnia: string;

    @IsOptional()
    historia_clinica: string;

    @IsOptional()
    ficha_familiar: string;

    @IsOptional()
    id_financiador: string;

    @IsOptional()
    descripcion_financiador: string;

    @IsOptional()
    descripcion_pais: string;

    @IsOptional()
    abrev_tipo_doc_personal: string;

    @IsOptional()
    numero_documento_personal: string;

    @IsOptional()
    apellido_paterno_personal: string;

    @IsOptional()
    apellido_materno_personal: string;

    @IsOptional()
    nombres_personal: string;

    @IsOptional()
    fecha_nacimiento_personal: string;

    @IsOptional()
    id_condicion: string;

    @IsOptional()
    descripcion_condicion: string;

    @IsOptional()
    id_profesion: string;

    @IsOptional()
    descripcion_profesion: string;

    @IsOptional()
    id_colegio: string;

    @IsOptional()
    descripcion_colegio: string;

    @IsOptional()
    numero_colegiatura: string;

    @IsOptional()
    abrev_tipo_doc_registrador: string;

    @IsOptional()
    numero_document_registrador: string;

    @IsOptional()
    apellido_paterno_registrador: string;

    @IsOptional()
    apellido_materno_registrador: string;

    @IsOptional()
    nombres_registrador: string;

    @IsOptional()
    fecha_nacimiento_registrador: string;

    @IsOptional()
    id_condicion_establecimiento: string;

    @IsOptional()
    id_condicion_servicio: string;

    @IsOptional()
    edad_reg: string;

    @IsOptional()
    tipo_edad: string;

    @IsOptional()
    anio_actual_paciente: string;

    @IsOptional()
    mes_actual_paciente: string;

    @IsOptional()
    dia_actual_paciente: string;

    @IsOptional()
    id_turno: string;

    @IsOptional()
    codigo_item: string;

    @IsOptional()
    descripcion_item: string;

    @IsOptional()
    tipo_diagnostico: string;

    @IsOptional()
    valor_lab: string;

    @IsOptional()
    id_correlativo: string;

    @IsOptional()
    peso: string;

    @IsOptional()
    talla: string;

    @IsOptional()
    hemoglobina: string;

    @IsOptional()
    perimetro_abdominal: string;

    @IsOptional()
    perimetro_cefalico: string;

    @IsOptional()
    descripcion_otra_condicion: string;

    @IsOptional()
    fecha_ultima_regla: string;

    @IsOptional()
    fecha_solicitud_hb: string;

    @IsOptional()
    fecha_resultado_hb: string;

    @IsOptional()
    fecha_registro: string;

    @IsOptional()
    fecha_modificacion: string;

}