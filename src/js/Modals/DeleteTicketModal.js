import TicketService from '../TicketService';

export default class DeleteTicketModal {
  constructor(modalContainer, ticketId) {
    this.modalContainer = modalContainer;
    this.ticketId = ticketId;
  }

  drawModal() {
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');
    this.modal.innerHTML = `
      <div class="modal-content">
        <h5 class="modal-title">Удалить тикет</h5>
        <p class="modal-text">Вы уверены, что хотите удалить тикет? Это действие необратимо.</p>
        <div class="modal-control">
          <button class="button ok-button">Ок</button>
          <button class="button cancel-button">Отмена</button>
        </div>
      </div>`;

    this.modalContainer.appendChild(this.modal);
  }

  removeModal() {
    this.modalContainer.removeChild(this.modal);
  }

  init() {
    return new Promise((resolve) => {
      this.drawModal();

      this.modal.addEventListener('click', async (event) => {
        const { target } = event;

        if (target.classList.contains('cancel-button')) {
          this.removeModal();
        } else if (target.classList.contains('ok-button')) {
          await TicketService.delete(this.ticketId);
          this.removeModal();
          resolve();
        }
      });
    });
  }
}
