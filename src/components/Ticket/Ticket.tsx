import React from 'react';
import {ITicket} from "../../interfaces/Ticket";
import './Ticket.scss';

interface TicketProps {
    ticket: ITicket;
}

const Ticket: React.FC<TicketProps> = ({ ticket }) => {

    const formatStops = (stops: number) => {
        switch (stops) {
            case 0:
                return "Без пересадок";
            case 1:
                return "1 пересадка";
            case 2:
                return "2 пересадки";
            case 3:
                return "3 пересадки";
            default:
                return `${stops} пересадок`; // This handles any other number not explicitly defined
        }
    };

    return (
        <div className="ticket">
            <div className="ticket-header">
                <div>{ticket.airline.name}</div>
                <img src={ticket.airline.logo} alt={ticket.airline.name} style={{width: '50px', height: '50px'}}/>
                <button>
                    Купить - {ticket.price} RUB
                </button>
            </div>
            <div className="time">
                <span>{ticket.departure.time}</span>
                <div>{formatStops(ticket.stops)}</div>
                <span>{ticket.arrival.time}</span>
            </div>

        </div>
    );
};

export default Ticket;
