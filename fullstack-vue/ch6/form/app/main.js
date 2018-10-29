const buttonRow = {
    template: `<div>
        <button @click="onButtonClick" name="button-hoodie" value="fullstack-hoodie" class="ui button">Hoodie</button>
        <button @click="onButtonClick" name="button-tee" value="fullstack-tee" class="ui button">Tee</button>
        <button @click="onButtonClick" name="button-fitted-cap" value="fullstack-fitted-cap" class="ui button">Fitted Cap</button>
        <button @click="onButtonClick" name="button-jacket" value="fullstack-jacket" class="ui button">Jacket</button>
    </div>`,
    methods: {
        onButtonClick(event) {
            const button = event.target;
            console.log(`The user clicked ${button.name}: ${button.value}`);
        }
    }
};

const inputForm = {
    template: `<div class="input-form">
        <form @submit="submitForm" class="ui form">
            <div class="field">
                <label>New Item</label>
                <input v-model="fields.newItem" type="text" placeholder="Add an item!">
                <span style="color: red">{{ fieldErrors.newItem }}</span>
            </div>
            <div class="field">
                <label>Email</label>
                <input v-model="fields.email" type="text" placeholder="What's your email?" />
                <span style="color: red">{{ fieldErrors.email }}</span>
            </div>
            <div class="field">
                <label>Urgency</label>
                <select v-model="fields.urgency" class="ui fluid search dropdown">
                    <option disabled value="">Please select one</option>
                    <option>Nonessential</option>
                    <option>Moderate</option>
                    <option>Urgent</option>
                </select>
                <span style="color: red">{{ fieldErrors.urgency }}</span>
            </div>
            <div class="field">
                <div class="ui checkbox">
                    <input v-model="fields.termsAndConditions" id="terms" type="checkbox" />
                    <label for="terms" >I accept the terms and conditions</label>
                    <span style="color: red">{{ fieldErrors.termsAndConditions }}</span>
                </div>
            </div>
            <button class="ui button">Submit</button>
        </form>
        <div class="ui segment">
            <h4 class="ui header">Items</h4>
            <ul>
                <li v-for="item in items" class="item">{{ item }}</li>
            </ul>
        </div>
    </div>`,
    data() {
        return {
            fields: {
                newItem: '',
                email: '',
                urgency: '',
                termsAndConditions: false
            },
            fieldErrors: {
                newItem: undefined,
                email: undefined,
                urgency: undefined,
                termsAndConditions: undefined
            },
            items: [],
        }
    },
    methods: {
        submitForm(event) {
            event.preventDefault();

            this.fieldErrors = this.validateForm(this.fields);
            if (Object.keys(this.fieldErrors).length) return;

            this.items.push(this.fields.newItem);
            this.fields.newItem = '';
            this.fields.email = '';
            this.fields.urgency = '';
            this.fields.termsAndConditions = false;
        },
        validateForm(fields) {
            const errors = {};
            if (!fields.newItem) errors.newItem = "New Item required!";
            if (!fields.email) errors.email = "Email required!";
            if (!fields.urgency) errors.urgency = "Urgency required!";
            if (!fields.termsAndConditions) {
                errors.termsAndConditions = "Terms and conditions have to be approved!";
            }

            if (fields.email && !this.isEmail(fields.email)) {
                errors.email = "Invalid email address!";
            }

            return errors;
        },
        isEmail(email) {
            const re = /\S+@\S+\.\S+/;
            return re.test(email);
        }
    }
}

new Vue({
    el: "#app",
    components: {
        "button-row": buttonRow,
        "input-form": inputForm
    }
});
