import {createElement, EventEmitter} from './helpers';

class View extends EventEmitter {
    constructor() {
        super();

        this.form = document.getElementById('todo-form');
        this.input = document.getElementById('add-input');
        this.list = document.getElementById('todo-list');
        this.form.addEventListener('submit', this.handleAdd.bind(this));
    }

    createElement(todo) {
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
            className: `todo-item${todo.completed ? ' completed' : ''}`,
            id: todo.id
        }, checkbox, label, editInput, editButton, removeButton);

        return this.addEventsListeners(item);
    }

    addEventsListeners(item) {
        const checkbox = item.querySelector('.checkbox');
        const editButton = item.querySelector('.edit');
        const removeButton = item.querySelector('.remove');

        checkbox.addEventListener('change', this.handleToggle.bind(this));
        editButton.addEventListener('click', this.handleEdits.bind(this));
        removeButton.addEventListener('click', this.handleRemove.bind(this));

        return item;
    }

    handleAdd(event) {
        event.preventDefault();

        if (!this.input.value) return alert('You should write task name.');

        const value = this.input.value;

        this.emit('add', value)
    }

    handleToggle({target}) {
        const listItem = target.parentNode;
        const id = listItem.id;
        const completed = target.checked;

        this.emit('toggle', {id, completed});
    }

    handleEdits({target}) {
        const listItem = target.parentNode;
        const id = listItem.id;
        const label = listItem.querySelector('.title');
        const input = listItem.querySelector('.textfield');
        const editButton = listItem.querySelector('.edit');
        const title = input.value;
        const isEditing = listItem.classList.contains('editing');

        if (isEditing) {
            this.emit('edit', {id, title})
        } else {
            input.value = label.textContent;
            editButton.textContent = 'Save';
            listItem.classList.add('editing');
        }
    }

    handleRemove({target}) {
        const listItem = target.parentNode;
        const id = listItem.id;

        this.emit('remove', id);
    }

    findListItem(id) {
        return document.getElementById(id);
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
        const input = listItem.querySelector('.textfield');
        const editButton = listItem.querySelector('.edit');

        label.textContent = todo.title;
        editButton.textContent = 'Edit';
        listItem.classList.remove('editing');
    }

    removeItem(todo) {
        const listItem = this.findListItem(todo);

        this.list.removeChild(listItem);
    }
}

export default View;