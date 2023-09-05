import moment from 'moment';

export default class Ticket {
  constructor(data) {
    this.data = data;
  }

  static getHTML() {
    return `
    <input class="tickets-list__item-status" type="checkbox">
    <span class="tickets-list__item-name"></span>
    <span class="tickets-list__item-created"></span>
    <button class="tickets-list__item-edit-btn">&#9998</button>
    <button class="tickets-list__item-delete-btn">X</button>
    
    `; // <p class="tickets-list__item-description hidden"></p>
  }

  getTicket() {
    // console.log(this.data)
    this.ticketElm = document.createElement('li');
    this.ticketElm.classList.add('tickets-list__item');
    this.ticketElm.innerHTML = Ticket.getHTML();
    const formatedDateTime = moment(this.data.created).format('DD.MM.YY HH:mm');

    const nameElm = this.ticketElm.querySelector('.tickets-list__item-name');
    nameElm.innerText = this.data.name;

    // const fullDescription = this.ticketElm.querySelector('.tickets-list__item-description');
    // fullDescription.innerText = this.data.description;
    this.ticketElm.querySelector('.tickets-list__item-created').innerText = formatedDateTime;

    const editBtn = this.ticketElm.querySelector('.tickets-list__item-edit-btn');
    const deleteBtn = this.ticketElm.querySelector('.tickets-list__item-delete-btn');
    const statusBox = this.ticketElm.querySelector('.tickets-list__item-status');

    statusBox.checked = this.data.status;

    const onChangeTicket = (data) => {
      this.data = data;
      nameElm.innerText = this.data.name;
      // fullDescription.innerText = data.description;
      statusBox.checked = this.data.status;
    };

    const onRemoveTicket = () => { this.ticketElm.remove(); };

    return {
      ticketElm: this.ticketElm,
      nameElm,
      editBtn,
      deleteBtn,
      statusBox,
      onChangeTicket,
      onRemoveTicket,
    };
  }

  getTicketDescription(data) {
    const descrElm = this.ticketElm.querySelector('.tickets-list__item-description');

    if (descrElm) {
      return descrElm;
    }

    return Ticket.createDescription(data);
  }

  static createDescription(data) {
    const description = document.createElement('p');
    description.classList.add('tickets-list__item-description');
    description.innerText = data.description;
    return description;
  }
}
