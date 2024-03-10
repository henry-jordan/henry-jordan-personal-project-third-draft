import { message_array } from "../chat/message_array.js";
import { textarea_height_handler } from "../chat/textarea_height.js";
import { welcome_subpage } from "./welcome-subpage.js";

export class assignment {

    constructor(parent) {

        this.parent = parent;
        this.parent_page = null;
        
    };
    
    activate_page() {
        
        this.parent.innerHTML = this.generate_html();
        this.bind_buttons();
                
    }

    generate_html() {

        return`
        <div class="sidebar-container">
        <button id="home-button" class="sidebar-button">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 576 512"><style>svg{fill:#fefefe}</style><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
        </button>
        <button id="chat-button" class="sidebar-button">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 512 512"><style>svg{fill:#fdfdfd}</style><path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"/></svg>
        </button>
        <button id="doc-button" class="sidebar-button">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 384 512"><style>svg{fill:#fdfdfd}</style><path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z"/></svg>
        </button>
        <button id="source=button" class="sidebar-button">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 448 512"><style>svg{fill:#fdfdfd}</style><path d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432V346.1z"/></svg>
        </button>
        </div>
        <div class="content">Assignment Page</div>`;

    };

    bind_buttons() {

        // this.parent.querySelector('#home-button').onclick = () => {this.home_button()};
        // this.parent.querySelector('#chat-button').onclick = () => {this.chat_button()};
        // this.parent.querySelector('#doc-button').onclick = () => {this.switch_button()};
        // this.parent.querySelector('#source-button').onclick = () => {this.switch_button()};

    };

    home_button() {

        const switchEvent = new CustomEvent('switch_page', {detail : {page : 'home_page'}});
        document.dispatchEvent(switchEvent);

    };

    chat_button() {

        const switchEvent = new CustomEvent('switch_page', {detail: {page : 'chat_page'}})
        document.dispatchEvent(switchEvent);

    };
};

export class chat_page extends assignment {

    constructor(parent) {

        super(parent);
        this.parent_page = 'assignment';
        this.message_array = new message_array(this.parent);
        this.pressed_keys = {};
        this.height_map = [];
        
    };

    activate_page() {

        this.parent.innerHTML = '<div class="content"></div>';
        this.parent.querySelector('.content').innerHTML = this.generate_html();

        this.bind_buttons();

        const page = new welcome_subpage;
        page.activate_page();

    };

    generate_html() {

        return`
        <button class="info-button">
            <img src="../static/styles/images/circle-info-outline.svg" height="20px" width="20px" class="info-image">
        </button>
        <div class="info-popup">
            <div class="info-top">
                <h4 class="info-header">About</h4>
                <button class="info-exit">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                </button>
            </div>
            <p class="info-text">Welcome to the chat demo of the Homework Engine project. Updates will be frequent and if you encounter issues or have any comments, please let me know. Feel free to use it as much as you'd like.</p>
        </div>
        <div class="info-blur"></div>
        <div class="message-scroll"><div class="center-bg"></div><div class="message-array"></div></div>
        <div class="message-edit-options">
            <button class="message-edit-confirm">Confirm</button>
            <button class="message-edit-cancel">Cancel</button>
        </div>
        <div class="chat-input-wrapper">
            <div class="chat-input-container">
                <textarea id="chat-input" placeholder="Type here..." rows="1"></textarea>
                <button id="chat-submit">
                <svg xmlns="http://www.w3.org/2000/svg" id="submit-icon" height="16px" width="16px" viewBox="0 0 512 512"><style>svg{fill:#fdfdfd}</style><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>
                </button>
                </div>
        </div>`;

    };

    bind_buttons() {

        this.parent.querySelector('#chat-submit').onclick = () => this.submit_message();
        this.parent.querySelector('#chat-input').addEventListener('input', (e) => {this.chat_input_filter(e)});
        document.addEventListener('copy', (e) => {this.normalize_clipboard(e)});

        document.addEventListener('keydown', (e) => { this.pressed_keys[e.key] = true });
        document.addEventListener('keyup', (e) => { delete this.pressed_keys[e.key] })

        document.addEventListener('click', (e) => {this.close_info(e)});

        this.parent.querySelector('.info-button').addEventListener('click', (e) => {this.open_info(e)});
    };

    async submit_message() {

        const element = this.parent.querySelector('#chat-input');
        const input = element.value;

        if (!(element.value.length > 1)) {

            return;

        }

        const element_wrapper = this.parent.querySelector('.chat-input-container');

        this.message_array.submit_user_message(input);
        this.parent.querySelector('#chat-input').value = '';

        textarea_height_handler(element, element_wrapper);
        
        this.message_array.submit_response_message();

    };

    chat_input_filter(e) {

        const element_wrapper = this.parent.querySelector('.chat-input-container');
        const element = this.parent.querySelector('#chat-input');

        if (e.inputType === "insertLineBreak" &&  !(this.pressed_keys['Shift'])) {

            if (element.value.length > 1) {

                this.submit_message();

            } else {

                const value = `${element.value.substring(0, element.value.length - 1)}`;
                element.value = value;

            };

        };
    
        textarea_height_handler(element, element_wrapper);
    };

    normalize_clipboard(e) {

        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const content = range.cloneContents();
      
        const normalizedContent = content.textContent.trim();
      
        e.clipboardData.setData('text/plain', normalizedContent);
        e.preventDefault();

    };

    open_info(e) {

        e.stopPropagation();

        const popup = this.parent.querySelector('.info-popup')

        popup.classList.toggle('show');
        this.parent.querySelector('.info-blur').classList.toggle('show');

    };

    close_info(e) {

        const popup = this.parent.querySelector('.info-popup');
        const text = this.parent.querySelector('.info-text');
        const image = 'info-image';

        const is_shown = popup.classList.contains('show');

        if (e.target != popup && e.target != text && is_shown) {

            popup.classList.toggle('show');
            this.parent.querySelector('.info-blur').classList.toggle('show');

        };

    };


        
};