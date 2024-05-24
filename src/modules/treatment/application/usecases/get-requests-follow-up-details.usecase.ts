import { IResponse } from "src/common/interfaces/response.interface";
import { TreatementRequestsRepository } from "../../domain/repository/treatment-requests.repository";
import { GetFollowUpDto } from "../dto/get-follow-up.dto";
import { IGetFollowUpRepositoryResponse } from "../../domain/interfaces/get-follow-up-repository-response.interface";
import { HandleExceptionHelper } from "src/common/helpers/handle-exception.helper";
import { ResponseHelper } from "src/common/helpers/response.helper";
import { IGetRequestFollowUpDetailsRepositoryResponse } from "../../domain/interfaces/get-requests-follow-up-details-repository-response.interface";

export class GetRequestsFollowUpDetailsUseCase {


    constructor(
        private readonly treatmentRequestRepository: TreatementRequestsRepository
    ) { }

    async exec(data: GetFollowUpDto): Promise<IResponse> {
        try {
            const response = new ResponseHelper();

            const followUpDetails = await this.treatmentRequestRepository.getFollowUpDetails({
                user_creator: data.user_creator,
                created_at: data.created_at
            });

            let processedResponse = {};

            processedResponse['data_for_pdf_generation'] = this.processDataForPDFGeneration(followUpDetails);
            processedResponse['data_blank'] = followUpDetails;

            response.result(processedResponse);

            return response.resolve();
        } catch (error) {
            throw new HandleExceptionHelper(error).throw();
        }
    }

    private processDataForPDFGeneration(data: IGetRequestFollowUpDetailsRepositoryResponse) {
        let response = { content: [], styles: {} };

        response.content.push({ text: 'Seguimiento de consultas', style: 'header' },);
        response.content.push('Reporte de consultas generadas por los profesionales durante el mes')

        // Requests per day
        response.content.push({ text: `Consultas del día ${data.requests_per_day[0].created_at.toLocaleDateString()}`, style: 'subheader' })

        let tableDaySkeleton = {
            table: {
                headerRows: 1,
                body: []
            }
        };

        tableDaySkeleton.table.body.push([
            { text: 'PROFESIONAL', style: 'tableHeader', fillColor: '#ececec', },
            { text: 'PACIENTE', style: 'tableHeader', fillColor: '#ececec', },
            { text: 'FECHA', style: 'tableHeader', fillColor: '#ececec', },
        ])

        data.requests_per_day.forEach((day) => {
            tableDaySkeleton.table.body.push([
                `${day.user_creator.name} ${day.user_creator.paternal_surname}`,
                `${day.patient.name} ${day.patient.paternal_surname}`,
                `${day.created_at.toLocaleDateString()} ${day.created_at.toLocaleTimeString()}`
            ])
        });

        response.content.push(tableDaySkeleton)

        // Requests per month
        response.content.push({ text: `Consultas del mes`, style: 'subheader' })

        let tableMonthSkeleton = {
            table: {
                headerRows: 1,
                body: []
            }
        };

        tableMonthSkeleton.table.body.push([
            { text: 'PROFESIONAL', style: 'tableHeader', fillColor: '#ececec', },
            { text: 'PACIENTE', style: 'tableHeader', fillColor: '#ececec', },
            { text: 'FECHA', style: 'tableHeader', fillColor: '#ececec', },
        ]);

        data.requests_per_day.forEach((day) => {
            tableMonthSkeleton.table.body.push([
                `${day.user_creator.name} ${day.user_creator.paternal_surname}`,
                `${day.patient.name} ${day.patient.paternal_surname}`,
                `${day.created_at.toLocaleDateString()} ${day.created_at.toLocaleTimeString()}`
            ])
        });

        response.content.push(tableMonthSkeleton)

        response.styles = {
            header: {
                fontSize: 25,
                alignment: 'center',
                bold: true,
                margin: [0, 0, 0, 30]
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 10]
            },
            tableExample: {
                margin: [0, 5, 0, 15]
            },
            tableOpacityExample: {
                margin: [0, 5, 0, 15],
                fillColor: 'blue',
                fillOpacity: 0.3
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            }
        };

        return response;
    }
}