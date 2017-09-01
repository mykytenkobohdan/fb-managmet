import {createElement} from './helpers';

export default class View {
    constructor() {
        this.form = document.getElementById('todo-form');
        this.input = document.getElementById('add-input');
        this.list = document.getElementById('todo-list');
    }

    static createElement(todo) {
        const checkbox = createElement('input', {
            type: 'checkbox',
            className: 'checkbox',
            checked: todo.completed ? 'checked' : '',
        });
        const label = createElement('label', {className: 'title'}, todo.title);
        const editInput = createElement('input', {type: 'text', className: 'textfield'});
        const editButton = createElement('button', {className: 'edit'}, 'Edit');
        const removeButton = createElement('button', {className: 'remove'}, 'Remove');
        const item = createElement('li', {
            className: `todo-tem${todo.completed ? ' completed' : ''}`,
            'data-id': todo.id
        }, checkbox, label, editInput, editButton, removeButton);

        return this.addEventsListeners(item);
    }

    static addEventsListeners(item) {
        const checkbox = item.querySelector('.checkbox');
        const editButton = item.querySelector('.edit');
        const removeButton = item.querySelector('.remove');

        checkbox.addEventListener('change', this.handleToggle.bind(this));
        editButton.addEventListener('click', this.handleEdits.bind(this));
        removeButton.addEventListener('click', this.handleRemove.bind(this));

        return item;
    }

    handleToggle(event) {

    }

    handleEdits(event) {

    }

    handleRemove(event) {

    }

    findListItem(id) {
        return this.list.querySelector(`[data-id="${id}"]`);
    }

    addItem(todo) {
        const listItem = this.createElement(todo);

        this.input.value = '';
        this.list.appendChild(listItem);
    }

    toggleItem(todo) {
        const listItem = this.findListItem(todo.id);
        const checkbox = listItem.querySelector('.checkbox');

        checkbox.checked = todo.completed;

        if (todo.completed) {
            listItem.classList.add('completed');
        } else {
            listItem.classList.remove('completed');
        }
    }

    editItem(todo) {
        const listItem = this.findListItem(todo.id);
        const label = listItem.querySelector('.title');
        const input = listItem.querySelector('.text-field');
        const editButton = listItem.querySelector('.edit');

        label.textContent = todo.title;
        editButton.textContent = 'Edit';
        listItem.classList.remove('editing');
    }

    removeItem(todo) {
        const listItem = this.findListItem(todo.id);

        this.list.removeChild(listItem);
    }
}