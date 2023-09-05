import Modal from './Modal';
import Requests from './Request';
import Ticket from './Ticket';

export default class Controller {
  constructor(container, port) {
    this.container = container;
    this.requests = new Requests(port);
  }

  init = async () => {
    this.ticketslist = this.container.querySelector('.tickets-list');
    const btnAdd = this.container.querySelector('.btn-add');

    await this.requests.getAllTickets();

    if (this.requests.ticketsArr[0]) {
      this.requests.ticketsArr.forEach((elm) => this.renderTicket(elm));
    }

    btnAdd.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = new Modal();
      const { inpShort, textFull, cancelBtn, okBtn, removeModal } = modal.addOrEditTicket();

      okBtn.addEventListener('click', async (ev) => {
        ev.preventDefault();

        const newTicket = await this.requests.createTicket({
          name: inpShort.value,
          description: textFull.value,
        });

        if (newTicket) {
          this.renderTicket(newTicket);
          removeModal();
        }
      });

      cancelBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        removeModal();
      });
    });
  };

  renderTicket(ticket) {
    const ticketItem = new Ticket(ticket);
    const {
      ticketElm,
      nameElm,
      editBtn,
      deleteBtn,
      statusBox,
      onChangeTicket,
      onRemoveTicket,
    } = ticketItem.getTicket();

    this.ticketslist.append(ticketElm);
    // edit
    editBtn.addEventListener('click', async (ev) => {
      ev.preventDefault();

      await this.requests.getTicketById(ticket);

      const modal = new Modal(this.requests.ticket);
      const { inpShort, textFull, cancelBtn, okBtn, removeModal } = modal.addOrEditTicket(true);

      okBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const newTicket = await this.requests.changeTicketByaId({
          id: ticket.id,
          name: inpShort.value,
          description: textFull.value,
        });

        if (newTicket) {
          onChangeTicket(newTicket);
          removeModal();
        }
      });

      cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        removeModal();
      });
    });

    // delete
    deleteBtn.addEventListener('click', async (ev) => {
      ev.preventDefault();

      const modal = new Modal();

      const { cancelBtn, okBtn, removeModal } = modal.removeTicket();

      okBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const id = await this.requests.deleteTicketByaId(ticket);

        if (id) {
          onRemoveTicket();
          removeModal();
        }
      });

      cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        removeModal();
      });
    });

    // checkbox
    statusBox.addEventListener('change', async (ev) => {
      ev.preventDefault();

      const newTicket = await this.requests.changeTicketByaId({
        id: ticket.id,
        status: ev.target.checked,
      });

      if (newTicket) {
        onChangeTicket(newTicket);
      }
    });
    // description
    // nameElm.addEventListener('click', (ev) => {
    //   ev.preventDefault();
    //   const descrElm = ticketElm.querySelector('.tickets-list__item-description');
    //   descrElm.classList.toggle('hidden');
    // });

    nameElm.addEventListener('click', async (ev) => {
      ev.preventDefault();

      await this.requests.getTicketById(ticket);
      const descrElm = ticketItem.getTicketDescription(this.requests.ticket);

      if (ticketElm.contains(descrElm)) { return descrElm.remove(); }

      ticketElm.append(descrElm);
      return '';
    });
  }
}
