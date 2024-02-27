export default class TicketService {
  // static BASE_URL = 'http://localhost:7070';
  static BASE_URL = 'https://helpdesk-backend-server.onrender.com';

  static async create(ticketData) {
    const url = new URL(this.BASE_URL);
    url.searchParams.append('method', 'createTicket');

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(ticketData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    return data;
  }

  static async update(ticketId, newTicketData) {
    const url = new URL(this.BASE_URL);
    url.searchParams.append('method', 'updateTicket');
    url.searchParams.append('id', ticketId);

    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(newTicketData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    return data;
  }

  static async delete(ticketId) {
    const url = new URL(this.BASE_URL);
    url.searchParams.append('method', 'deleteTicket');
    url.searchParams.append('id', ticketId);

    const response = await fetch(url, {
      method: 'DELETE',
    });

    return response;
  }

  static async get(ticketId) {
    const url = new URL(this.BASE_URL);
    url.searchParams.append('method', 'ticketById');
    url.searchParams.append('id', ticketId);

    const response = await fetch(url);
    const data = await response.json();

    return data;
  }

  static async getAll() {
    const url = new URL(this.BASE_URL);
    url.searchParams.append('method', 'allTickets');

    const response = await fetch(url);
    const data = await response.json();

    return data;
  }
}
