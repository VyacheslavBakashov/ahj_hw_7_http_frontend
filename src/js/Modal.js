export default class Modal {
  constructor(ticket) {
    this.ticket = ticket;
    this.html = Modal.addOrEditHTML();
    this.delHTML = Modal.deleteHTML();
  }

  static addOrEditHTML() {
    return `
      <p class="modal__title">Добавить тикет</p>
      <label class="modal__label" for="short-description">Краткое описание</label>
      <input class="modal__input_short" type="text" id="short-description">
      <label class="modal__label" for="full-description">Подробное описание</label>
      <textarea class="modal__textarea_full" type="text" id="full-description"></textarea>
      <div class="wrap-btns">
        <button class="modal__cancel-btn">Отмена</button>
        <button class="modal__ok-btn">Ok</button>
      </div>
    `;
  }

  static deleteHTML() {
    return `
      <p class="modal__title">Удалить тикет</p>
      <p class="modal__text">Вы уверены, что хотите удалить тикет? Это действие необратимо.</p>
      <div class="wrap-btns">
        <button class="modal__cancel-btn">Отмена</button>
        <button class="modal__ok-btn">Ok</button>
      </div>
    `;
  }

  static createForm(innerHTML) {
    const form = document.createElement('form');
    form.classList.add('modal');
    form.innerHTML = innerHTML;
    return form;
  }

  addOrEditTicket(edit = false) {
    const form = Modal.createForm(this.html);
    document.body.append(form);

    const inpShort = form.querySelector('.modal__input_short');
    const textFull = form.querySelector('.modal__textarea_full');
    const cancelBtn = form.querySelector('.modal__cancel-btn');
    const okBtn = form.querySelector('.modal__ok-btn');
    const removeModal = () => form.remove();

    if (edit) {
      inpShort.value = this.ticket.name;
      textFull.value = this.ticket.description;
    }

    return { inpShort, textFull, cancelBtn, okBtn, removeModal };
  }

  removeTicket() {
    const form = Modal.createForm(this.delHTML);
    document.body.append(form);

    const cancelBtn = form.querySelector('.modal__cancel-btn');
    const okBtn = form.querySelector('.modal__ok-btn');
    const removeModal = () => form.remove();

    return { cancelBtn, okBtn, removeModal };
  }
}
