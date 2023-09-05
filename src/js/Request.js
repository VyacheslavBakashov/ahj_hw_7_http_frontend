/* eslint-disable no-console */
/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */

export default class Requests {
  constructor(port) {
    this.port = port;
    this._ticket = {};
    this._ticketsArr = [];
  }

  get ticket() {
    return this._ticket;
  }

  get ticketsArr() {
    return this._ticketsArr;
  }

  async getTicketById({ id }) {
    try {
      const response = await fetch(
        `http://localhost:${this.port}/tickets?method=ticketById&id=${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      this._ticket = data;
    } catch (err) { console.log(err); }
  }

  async getAllTickets() {
    try {
      const response = await fetch(
        `http://localhost:${this.port}/tickets?method=allTickets`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      console.log(data);
      this._ticketsArr = data;
    } catch (err) { console.log(err); }
  }

  async createTicket(ticketData) {
    try {
      const response = await fetch(
        `http://localhost:${this.port}/tickets?method=createTicket`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ticketData),
        },
      );
      return await response.json();
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async changeTicketByaId({ id, ...rest }) {
    try {
      const response = await fetch(
        `http://localhost:${this.port}/tickets?method=updateById&id=${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(rest),
        },
      );
      // console.log(response.json());
      return await response.json();
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async deleteTicketByaId({ id }) {
    try {
      await fetch(
        `http://localhost:${this.port}/tickets?method=removeById&id=${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return id;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
