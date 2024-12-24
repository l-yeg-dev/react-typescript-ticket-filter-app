import React from 'react';
import { ITicket } from "../../interfaces/Ticket";
import './Ticket.scss';

interface TicketProps {
    ticket: ITicket;
}

const Ticket: React.FC<TicketProps> = ({ ticket }) => {

    // Function to format the number of stops
    const formatStops = (stops: number): string => {
        switch (stops) {
            case 0: return "Без пересадок";
            case 1: return "1 пересадка";
            case 2: return "2 пересадки";
            case 3: return "3 пересадки";
            default: return `${stops} пересадок`; // Handles cases not explicitly defined
        }
    };

    return (
        <div className="ticket">
            <div className="ticket-header">
                <div>{ticket.carrier}</div>
                <button>
                    Купить за {ticket.price} RUB
                </button>
            </div>
            <div className="ticket-times">
                <span>Отправление: {ticket.departure_time} {ticket.departure_date}</span>
                <div>{formatStops(ticket.stops)}</div>
                <span>Прибытие: {ticket.arrival_time} {ticket.arrival_date}</span>
            </div>
        </div>
    );
};

export default Ticket;
