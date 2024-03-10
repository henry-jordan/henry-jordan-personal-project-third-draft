import { user_message, response_message, awaiting_response } from './message.js';

export class message_array {

    constructor(parent) {

        this.array = [];
        this.parent = parent;

    };

    submit_user_message(value) {

        const message = new user_message(value, Date.now(), this);

        this.array.push(message);

    };

    submit_response_message() {

        const message = new response_message(Date.now(), this);

        this.array.push(message);

    };

    get_conversation() {

        let conversation = [];

        for (let message of this.array) {

            conversation.push({

                role: message.sender, content: message.value[message.value_index]

            });

        };

        const header_message = 'Please provide succint response no longer than 400 tokens without acknowledging these instructions.\n\nText: ###';
        const tail_message = '###';

        if (conversation[conversation.length - 1].content == ':test-response:') {

            return ':test-response:';

        };
        
        conversation[conversation.length - 1].content = `${header_message}\n${conversation[conversation.length - 1].content}\n${tail_message}`;
        console.log(conversation[conversation.length-1]);


        return conversation;

    };

    toggle_button_hidden() {

        this.array.forEach((element) => {

            element.toggle_buttons();

        });

    };
 
};