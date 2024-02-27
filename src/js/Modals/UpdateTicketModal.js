import TicketService from '../TicketService';

export default class UpdateTicketModal {
  constructor(modalContainer, ticketId) {
    this.modalContainer = modalContainer;
    this.ticketId = ticketId;
  }

  drawModal() {
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');
    this.modal.innerHTML = `
      <div class="modal-content">
        <h5 class="modal-title">Изменить тикет</h5>
        <form class="modal-form">
          <div class="form-name">
            <label class="form-label" for="name">Краткое описание</label>
            <input class="form-input name" type="text" id="name" maxlength="65">
          </div>
          <div class="form-description">
            <label class="form-label" for="description">Подробное описание</label>
            <textarea class="form-input description" id="description"></textarea>
          </div>
        </form>
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

  async init() {
    const oldTicketData = await TicketService.get(this.ticketId);

    return new Promise((resolve) => {
      this.drawModal();

      this.modal.querySelector('.name').value = oldTicketData.name;
      this.modal.querySelector('.description').value = oldTicketData.description;

      this.modal.addEventListener('click', async (event) => {
        const { target } = event;

        if (target.classList.contains('cancel-button')) {
          this.removeModal();
        } else if (target.classList.contains('ok-button')) {
          const name = this.modal.querySelector('.name').value;
          const description = this.modal.querySelector('.description').value;

          const newTicketData = {
            name,
            description,
          };

          await TicketService.update(this.ticketId, newTicketData);
          this.removeModal();
          resolve();
        }
      });
    });
  }
}
