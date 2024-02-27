import TicketService from './TicketService';
import AddTicketModal from './Modals/AddTicketModal';
import UpdateTicketModal from './Modals/UpdateTicketModal';
import DeleteTicketModal from './Modals/DeleteTicketModal';

export default class Desk {
  constructor(deskContainer, modalContainer) {
    this.deskContainer = deskContainer;
    this.modalContainer = modalContainer;
  }

  init() {
    this.drawDesk();
    this.drawTickets();
  }

  drawDesk() {
    const desk = document.createElement('div');
    desk.classList.add('desk');
    desk.innerHTML = `
      <div class="desk-control">
        <button class="button add-button">Добавить тикет</button>
      </div>
      <ul class="tickets-list"></ul>`;

    this.deskContainer.appendChild(desk);

    const addButton = desk.querySelector('.add-button');

    addButton.addEventListener('click', async () => {
      const addModal = new AddTicketModal(this.modalContainer);
      await addModal.init();
      this.drawTickets();
    });
  }

  drawTickets() {
    this.ticketsContainer = this.deskContainer.querySelector('.tickets-list');
    this.ticketsContainer.innerHTML = '';

    TicketService.getAll().then((tickets) => {
      tickets.forEach((ticketData) => this.drawTicket(this.ticketsContainer, ticketData));
    });
  }

  drawTicket(ticketsContainer, ticketData) {
    const ticket = document.createElement('li');
    ticket.classList.add('ticket');
    ticket.setAttribute('id', ticketData.id);
    ticket.innerHTML = `
      <div class="ticket-status">
        <div class="ticket-button status-button ${ticketData.status ? 'check' : ''}"></div>
      </div>
      <div class="ticket-content">
        <p class="ticket-name">${ticketData.name}</p>
      </div>
      <p class="ticket-datetime">${Desk.formatDate(ticketData.created)}</p>
      <div class="ticket-control">
        <div class="ticket-button edit-button"></div>
        <div class="ticket-button delete-button"></div>
      </div>`;

    ticketsContainer.appendChild(ticket);

    ticket.addEventListener('click', async (event) => {
      const { target } = event;
      const { id } = target.closest('.ticket');

      if (target.classList.contains('status-button')) {
        const newStatus = !ticket.querySelector('.check');
        const newTicketData = { status: newStatus };

        await TicketService.update(id, newTicketData);
        target.classList.toggle('check');
      } else if (target.classList.contains('edit-button')) {
        const updateModal = new UpdateTicketModal(this.modalContainer, id);
        await updateModal.init();
        this.drawTickets();
      } else if (target.classList.contains('delete-button')) {
        const deleteModal = new DeleteTicketModal(this.modalContainer, id);
        await deleteModal.init();
        this.drawTickets();
      } else {
        const ticketContent = ticket.querySelector('.ticket-content');
        const ticketDescription = ticketContent.querySelector('.ticket-description');

        if (ticketDescription) {
          ticketContent.removeChild(ticketDescription);
        } else {
          const fullTicketData = await TicketService.get(id);

          const description = document.createElement('p');
          description.classList.add('ticket-description');
          description.textContent = fullTicketData.description;

          ticketContent.appendChild(description);
        }
      }
    });
  }

  static formatDate(date) {
    const dateFormatter = new Intl.DateTimeFormat('ru-RU');
    const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
      hour: 'numeric',
      minute: 'numeric',
    });
    const formatedDate = `${dateFormatter.format(date)} ${timeFormatter.format(date)}`;

    return formatedDate;
  }
}
