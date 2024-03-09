import { IsBoolean, IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { PaginateDto } from "src/common/dto/paginate.dto";
import { DocumentTypesEnum } from "src/common/enum/document-types.enum";

export class ListUsersDto extends PaginateDto {

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
    lastname: string;

    @IsString()
    @IsOptional()
    username: string;

    @IsBoolean()
    @IsOptional()
    status: string;

}