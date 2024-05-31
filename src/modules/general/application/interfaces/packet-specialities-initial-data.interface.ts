export interface IPacketSpecialitiesInitialData {

    packet_code: string;
    specialities: ISpeciality[];

}

interface ISpeciality {

    code: string;
    sessions: number;

}