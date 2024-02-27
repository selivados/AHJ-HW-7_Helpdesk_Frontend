import Desk from './Desk';

const deskContainer = document.querySelector('.desk-container');
const modalContainer = document.querySelector('.modal-container');

const desk = new Desk(deskContainer, modalContainer);
desk.init();
