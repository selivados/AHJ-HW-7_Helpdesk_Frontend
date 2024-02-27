import TicketService from '../TicketService';

export default class AddTicketModal {
  constructor(modalContainer) {
    this.modalContainer = modalContainer;
  }

  drawModal() {
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');
    this.modal.innerHTML = `
      <div class="modal-content">
        <h5 class="modal-title">Добавить тикет</h5>
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

  init() {
    return new Promise((resolve) => {
      this.drawModal();

      this.modal.addEventListener('click', async (event) => {
        const { target } = event;

        if (target.classList.contains('cancel-button')) {
          this.removeModal();
        } else if (target.classList.contains('ok-button')) {
          const name = this.modal.querySelector('.name').value;
          const description = this.modal.querySelector('.description').value;
          const currentDateTime = new Date().getTime();

          const ticketData = {
            id: null,
            name,
            description,
            status: false,
            created: currentDateTime,
          };

          await TicketService.create(ticketData);
          this.removeModal();
          resolve();
        }
      });
    });
  }
}
