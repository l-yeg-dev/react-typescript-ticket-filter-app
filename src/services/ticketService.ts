import {ITicket} from '../interfaces/Ticket';

const fetchTickets = async (): Promise<ITicket[]> => {
    const response = await fetch('/tickets.json');
    if (!response.ok) {
        throw new Error('Failed to fetch tickets');
    }
    const data: { tickets: ITicket[] } = await response.json();
    return data.tickets;
};

export default fetchTickets;
