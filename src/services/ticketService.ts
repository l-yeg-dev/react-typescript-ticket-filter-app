import { ITicket } from '../interfaces/Ticket';

const fetchTickets = async (): Promise<ITicket[]> => {
    try {
        const response = await fetch('/tickets.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.tickets as ITicket[];
    } catch (error) {
        console.error("Failed to fetch tickets:", error);
        throw error;
    }
};

export default fetchTickets;