const EventBus = new Vue();

const inputComponent = {
  template: `<input 
              v-model="input" 
              class="input is-small" 
              :placeholder="placeholder" 
              type="text" 
              @keyup.enter="monitorEnterKey" />`,
  props: ['placeholder'],
  data() {
    return {
      input: ''
    }
  },
  methods: {
    // Custom Event using $emit (old method)
    // monitorEnterKey() {
    //   this.$emit('add-note', {
    //     note: this.input,
    //     timestamp: new Date().toLocaleString()
    //   });
    //   this.input = '';
    // }

    // Event Bus using EventBus.$emit
    monitorEnterKey() {
      EventBus.$emit('add-note', {
        note: this.input,
        timestamp: new Date().toLocaleString()
      });
      this.input = '';
    }
  }
}

const noteCountComponent = {
  template: `<div class="note-count">Note Count: <strong>{{ noteCount }}</strong></div>`,
  data() {
    return {
      noteCount: 0
    }
  },
  created() {
    // This is an event listener that will increment the noteCount variable
    // when the add-note event is triggered.
    EventBus.$on('add-note', event => this.noteCount++);
  }
}

new Vue({
  el: '#app',
  data: {
    notes: [],
    timestamps: [],
    placeholder: 'Enter a note'
  },
  created() {
    // This is an event listener that will call the addNote method
    // when the add-note event is triggered.
    EventBus.$on('add-note', event => this.addNote(event));
  },
  components: {
    'input-component': inputComponent,
    'note-count-component': noteCountComponent
  },
  methods: {
    addNote(event) {
      this.notes.push(event.note);
      this.timestamps.push(event.timestamp);
    }
  }
})
