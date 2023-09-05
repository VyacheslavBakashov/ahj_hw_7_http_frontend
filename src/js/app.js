import Controller from './Controller';

const container = document.querySelector('.container');
const port = 7000;
const controller = new Controller(container, port);

controller.init();
