import React, { useState, useEffect } from 'react';
import Ticket from '../Ticket/Ticket';
import fetchTickets from '../../services/ticketService';
import { ITicket } from '../../interfaces/Ticket';
import MultiSelectDropdown from "../Filter/MultiSelectDropdown";
import './TicketList.scss'

const TicketsList: React.FC = () => {
    const [tickets, setTickets] = useState<ITicket[]>([]);
    const [filteredTickets, setFilteredTickets] = useState<ITicket[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const stopsOptions = [
        { label: "Все", value: -1 },
        { label: "Без пересадок", value: 0 },
        { label: "1 пересадка", value: 1 },
        { label: "2 пересадки", value: 2 },
        { label: "3 пересадки", value: 3 }
    ];

    useEffect(() => {
        const loadTickets = async () => {
            try {
                setIsLoading(true);
                const fetchedTickets = await fetchTickets();
                setTickets(fetchedTickets);
                setFilteredTickets(fetchedTickets); // Initial filter might need adjustment based on your app logic
            } catch (error) {
                setError('Failed to fetch tickets');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        loadTickets();
    }, []);

    const handleFilterChange = (selectedStops: number[]) => {
        if (selectedStops.length === 0 || selectedStops.includes(-1)) {
            setFilteredTickets(tickets);
        } else {
            const filtered = tickets.filter(ticket => selectedStops.includes(ticket.stops));
            setFilteredTickets(filtered);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="tickets-list-container">
            <div className="filters-container">
                <MultiSelectDropdown options={stopsOptions} onChange={handleFilterChange} />
            </div>
            <div className="ticket-list">
                {filteredTickets.sort((a, b) => a.price - b.price).map(ticket =>
                    <Ticket key={`${ticket.origin_name}-${ticket.destination_name}-${ticket.arrival_time}`} ticket={ticket} />
                )}
            </div>
        </div>
    );
};

export default TicketsList;
