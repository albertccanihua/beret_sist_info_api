import { IsBoolean, IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { DocumentTypesEnum } from "src/common/enum/document-types.enum";
import { RolesEnum } from "src/common/enum/roles.enum";

export class GetUsersDto {

    @IsUUID()
    @IsOptional()
    id: string;

    @IsEnum(DocumentTypesEnum)
    @IsOptional()
    document_type: DocumentTypesEnum;

    @IsString()
    @IsOptional()
    document_number: string;

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    paternal_surname: string;

    @IsString()
    @IsOptional()
    maternal_lastname: string;

    @IsEnum(RolesEnum)
    @IsOptional()
    role: RolesEnum;

    @IsString()
    @IsOptional()
    username: string;

    @IsBoolean()
    @IsOptional()
    status: string;

}