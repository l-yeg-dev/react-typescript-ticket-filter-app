export interface IAirline {
    name: string;
    logo: string;
}

export interface IFlightTime {
    time: string;
    code: string;
}

export interface ITicket {
    id: string;
    airline: IAirline;
    departure: IFlightTime;
    arrival: IFlightTime;
    stops: number;
    price: number;
}

export interface TicketsResponse {
    tickets: ITicket[];
}
