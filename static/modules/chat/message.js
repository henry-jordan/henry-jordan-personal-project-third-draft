import { get_response } from "../answer_engine/get_response.js";

function remove_children(element) {

    while (element.firstChild) {

        element.removeChild(element.firstChild);

    };

}

function scroll_down() {

    const scroll_element = document.querySelector('.message-scroll');
    scroll_element.scrollTop = scroll_element.scrollHeight;

};

export class user_message {

    constructor(value, id, message_array) {

        this.value = [value.trim()];
        this.value_index = 0;
        this.id = id;
        this.sender = 'user';
        this.message_array = message_array;

        this.activate_message();

    };

    generate_wrapper() {

        return`<div class="user-message-container" id="user-message-${this.id}"></div>`;

    }

    generate_html() {

        if (this.value.length == 1) {
            
            return `
            <div class="user-message">
                <p class="message-text">${this.value[this.value_index]}</p>
            </div>
            <div class="user-message-options">
                <button class="edit-message-button"><svg xmlns="http://www.w3.org/2000/svg" height="12px" width="12px" viewBox="0 0 512 512"><style>svg{fill:#fdfdfd}</style><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg></button>
            </div>`;
            
        } else {

            return `
            <div class="user-message">
                <p class="message-text">${this.value[this.value_index]}</p>
            </div>
            <div class="user-message-options">
                <button class="edit-message-button"><svg xmlns="http://www.w3.org/2000/svg" height="12px" width="12px" viewBox="0 0 512 512"><style>svg{fill:#fdfdfd}</style><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg></button>
                <div class="message-selection">
                    <button class="message-selection-button" id="select-back">
                        <svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 320 512"><path fill="#fdfdfd" d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
                    </button>
                    ${this.value_index+1}
                    <button class="message-selection-button" id="select-next">
                        <svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 320 512"><path fill="#fdfdfd" d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>
                    </button>
                </div>
            </div>`;

        };

    };

    update_message() {

        try{

            remove_children(document.querySelector(`#user-message-${this.id}`))
        
        } catch (error) {

            document.querySelector('.message-array').insertAdjacentHTML('beforeend', this.generate_wrapper());

        }

        document.querySelector(`#user-message-${this.id}`).insertAdjacentHTML('beforeend', this.generate_html());

    };

    activate_message() {

        this.update_message();
        this.element = document.querySelector(`#user-message-${this.id}`);

        this.element.querySelector('.edit-message-button').onclick = (e) => {this.edit_message(e)};

        if (this.value.length > 1) {        
                
            this.element.querySelector('#select-back').onclick = () => {this.select_back_message()};
            this.element.querySelector('#select-next').onclick = () => {this.select_next_message()};
                       
            
        };

        scroll_down();
        
    };

    toggle_buttons() {

        this.element.querySelector('.edit-message-button').classList.toggle('button-display');

        try {     
                
            this.element.querySelector('#select-back').classList.toggle('button-display');
            this.element.querySelector('#select-next').classList.toggle('button-display');
                       
            
        } catch(error) {};

    };

    edit_message(e) {

        console.log('Working');

        e.stopPropagation();
        
        const edit_options = document.querySelector(`.message-edit-options`);
        const message_element = this.element.querySelector('.user-message');
        const text_element = this.element.querySelector('.message-text');
        const initial_value = text_element.innerText;

        if (message_element.classList.contains('editing')) {

            this.edit_message_cancel(initial_value);
            return;

        };
        
        console.log(`Enabled editing for Message ${this.value_index+1}.`);
        message_element.classList.toggle('editing');

        this.message_array.toggle_button_hidden();

        document.querySelector('.chat-input-container').classList.toggle('hidden');
        edit_options.classList.toggle('show');

        text_element.contentEditable = true;
        text_element.focus();

        const range = document.createRange();
        range.selectNodeContents(text_element);
        range.collapse(false);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        edit_options.querySelector('.message-edit-confirm').onclick = () => {this.edit_message_confirm()};
        edit_options.querySelector('.message-edit-cancel').onclick = () => {this.edit_message_cancel(initial_value)};

    };

    edit_message_confirm() {

        for (let i = 0; i < this.value.length; i++) {

            if (this.value[i] == this.element.querySelector('.message-text').innerText) {

                console.log(`Message permutation already exists: Message ${i+1}.`);

                this.value_index = i;

                this.edit_message_cancel();
                this.activate_message();

                return;

            };


        };

        console.log(`Message editing for Message ${this.value_index+1} saved.`)

        this.value.push(this.element.querySelector('.message-text').innerText.trim());
        this.value_index = this.value.length - 1;

        this.edit_message_cancel();
        this.activate_message();

    };

    edit_message_cancel(initial_value) {
        
        const edit_options = document.querySelector(`.message-edit-options`);
        const text_element = this.element.querySelector('.message-text');
        const message_element = this.element.querySelector('.user-message');
        
        message_element.classList.toggle('editing');
        
        this.message_array.toggle_button_hidden();

        if (initial_value) {

            console.log(`Message editing for Message ${this.value_index+1} canceled.`)

            text_element.innerText = initial_value;

        };

        edit_options.classList.toggle('show');
        
        document.querySelector('.chat-input-container').classList.toggle('hidden');

        text_element.contentEditable = false;
        
        edit_options.querySelector('.message-edit-confirm').removeEventListener('onclick', this.edit_message_confirm);
        edit_options.querySelector('.message-edit-cancel').removeEventListener('onclick', this.edit_message_cancel);

    };

    select_next_message() {

        console.log('test');
        
        if (this.value_index + 1 == this.value.length) {
            
            return;
            
        } else {

            this.value_index += 1;
            this.activate_message();

        };

    };

    select_back_message() {

        if (this.value_index == 0) {

            return;

        } else {

            this.value_index -= 1;
            this.activate_message();

        };

    };

};

export class response_message {

    constructor(id, message_array) {

        this.value = [];
        this.value_index = 0;
        this.id = id;
        this.sender = 'assistant';
        this.message_array = message_array;

        this.activate_message();

    };

    generate_wrapper() {

        return`<div class="engine-message-container" id="engine-message-${this.id}"></div>`;

    };

    generate_html() {

        if(this.value.length <= 1) {

            return `
            <div class="engine-message">
                <p class="message-text">${this.value[this.value_index]}</p>
                </div>
            <div class="engine-message-options">
                <button class="regenerate-message-button"><svg xmlns="http://www.w3.org/2000/svg" height="12px" width="12px" viewBox="0 0 512 512"><style>svg{fill:#fdfdfd}</style><path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"/></svg></button>
            </div>`;

        } else {

            return `
            <div class="engine-message">
                <p class="message-text">${this.value[this.value_index]}</p>
                </div>
            <div class="engine-message-options">
                <button class="regenerate-message-button"><svg xmlns="http://www.w3.org/2000/svg" height="12px" width="12px" viewBox="0 0 512 512"><style>svg{fill:#fdfdfd}</style><path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"/></svg></button>
                <div class="message-selection">
                    <button class="message-selection-button" id="select-back">
                        <svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 320 512"><path fill="#fdfdfd" d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
                    </button>
                    ${this.value_index+1}
                    <button class="message-selection-button" id="select-next">
                        <svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 320 512"><path fill="#fdfdfd" d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>
                    </button>
                </div>
            </div>`;

        };

    };

    generate_wait() {

        return`<span class="dot-wait" id="dot-wait-1">.</span><span class="dot-wait" id="dot-wait-2">.</span><span class="dot-wait" id="dot-wait-3">.</span>`

    }

    update_message() {

        try{

            document.querySelector('.message-array').removeChild(document.querySelector(`#engine-message-${this.id}`));
        
        } catch (error) {}

        document.querySelector('.message-array').insertAdjacentHTML('beforeend', this.generate_wrapper());
        document.querySelector(`#engine-message-${this.id}`).insertAdjacentHTML('beforeend', this.generate_html());

        const text_element = document.querySelector(`#engine-message-${this.id}`).querySelector('.message-text');
        const element = document.querySelector(`#engine-message-${this.id}`).querySelector('.engine-message')

        if (text_element.innerHTML == 'undefined') {

            text_element.innerHTML = '';
            element.classList.add('waiting');
            element.insertAdjacentHTML('beforeend', '<div class="skeleton"></div>')
            element.parentNode.querySelector('.regenerate-message-button').classList.add('hidden');

        } else {

            element.classList.remove('waiting');
            element.parentNode.querySelector('.regenerate-message-button').classList.remove('hidden');

            document.querySelector('#chat-input').focus();
        
        };

    };

    async activate_message() {

        this.update_message();
        this.element = document.querySelector(`#engine-message-${this.id}`);

        if (this.value.length <= 1) {

            this.buttons = {
    
                regenerate : this.element.querySelector('.regenerate-message-button'),
    
            };
    
            
        } else {
                        
            this.buttons = {
                
                regenerate : this.element.querySelector('.regenerate-message-button'),
                back: this.element.querySelector('#select-back'),
                next: this.element.querySelector('#select-next'),
                
            };            
            
        };
        
        this.activate_buttons();
        await this.push_response();

        scroll_down();

    };

    activate_buttons() {

        if (this.value.length <= 1) {

            this.buttons.regenerate.addEventListener('click', () => {this.regenerate_message()});

        } else {

            this.buttons.regenerate.addEventListener('click', () => {this.regenerate_message()});
            this.buttons.back.onclick = () => {this.select_back_message()};
            this.buttons.next.onclick = () => {this.select_next_message()};

        }

    };

    async fetch_response(input) {

        if (input == ':test-response:') {

            console.log('Test response.');
            return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

        };

        try {

            const response = await get_response(input);

            if (!(response) || response == ':no-response:') {

                console.log('No response.');

                return;

            } else if (response == ':test-response:') {

                console.log('Test response.');

                return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

            } else if (response == 'Error: $Connection error.') {

                console.error('Fetching API resonse unsuccessful: Failed to connect to OpenAI API.');

                return 'Error: Failed to connect to OpenAI API.';

            };

            console.log(`Fetching API response successful: ${response.substring(0, 15)}...`)

            return response;

        } catch (error) {};

    };

    async push_response() {

        const conversation = this.message_array.get_conversation();

        document.querySelector('#chat-submit').classList.toggle('hidden');
        document.querySelector('#chat-input').disabled = true

        const response = await this.fetch_response(conversation);
        
        document.querySelector('#chat-submit').classList.toggle('hidden');
        document.querySelector('#chat-input').disabled = false

        this.value.push(response);
        this.update_message();

    };

    async regenerate_message() {

        console.log('test');

        this.element.querySelector('.message-text').value = 'undefined';
        this.update_message();

        await this.push_response();
        this.value_index = this.value.length-1;

        console.log(this.value);
        this.update_message();

        // console.log(this.value_index);

    };

    toggle_buttons() {

        this.buttons.regenerate.classList.toggle('button-display');

    };

    select_next_message() {

        if (this.value_index + 1 == this.value.length) {

            return;

        } else {

            this.value_index += 1;
            this.update_message();

        };

    };

    select_back_message() {

        if (this.value_index == 0) {

            return;

        } else {

            this.value_index -= 1;
            this.update_message();

        };

    };

};

export class awaiting_response {

    constructor() {

        this.value = ':awaiting:';
        this.id = ':awaiting:';

    };

    generate_html() {

        return `
        <div class="awaiting-response-message">
            <p class="awaiting-response-text">
                <div class="dot-flashing"></div>
            </p>
        </div>`;

    };

    activate_message() {};

};