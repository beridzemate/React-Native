<script setup>
import { defineProps, ref } from 'vue';
import { getOpenAIModels, getStoredOpenAIKey, storeOpenAIKey } from '../lib/openAIClient.js';
import ChatList from './ChatList.vue';

const props = defineProps({
  vm: {
    type: Object,
    required: true
  },
  description: {
    type: String,
    required: false
  },
});

let loadingModels = ref(false);
let models = ref([]);
let errorMessage = ref('');

let enteredToken = ref('');
let openAIToken = ref(getStoredOpenAIKey());
if (openAIToken.value){
  initializeChat();
}

function saveToken() {
  openAIToken.value = enteredToken.value;
  storeOpenAIKey(enteredToken.value)
  initializeChat();
}

function initializeChat() {
  loadingModels.value = true;
  getOpenAIModels().then(gptModels => {
    loadingModels.value = false;
    models.value = gptModels;
  }).catch(err => {
    loadingModels.value = false;
    errorMessage.value = err;
  });
}

function clearKey() {
  localStorage.removeItem('openai-token');
  openAIToken.value = '';
  enteredToken.value = '';
  errorMessage.value = '';
  models.value = [];
}

const clearKey = () => {
  try {
    localStorage.removeItem('openai-token');
    
    // Assuming openAIToken, enteredToken, etc., are reactive states (like with Vue, React, etc.)
    openAIToken.value = '';
    enteredToken.value = '';
    errorMessage.value = '';
    models.value = [];

    console.log('All relevant states and localStorage have been cleared.');
  } catch (error) {
    console.error('Error clearing localStorage or resetting values:', error);
  }
};

const clearKey = () => {
  try {
    // Log the state of the chat container before clearing
    console.log('Clearing OpenAI token and resetting state...');
    console.log('Chat container state before:', {
      openAIToken: openAIToken.value,
      enteredToken: enteredToken.value,
      errorMessage: errorMessage.value,
      models: models.value
    });

    // Perform the clearing operation
    localStorage.removeItem('openai-token');
    openAIToken.value = '';
    enteredToken.value = '';
    errorMessage.value = '';
    models.value = [];

    // Log the chat container state after clearing
    console.log('Chat container state after clearing:', {
      openAIToken: openAIToken.value,
      enteredToken: enteredToken.value,
      errorMessage: errorMessage.value,
      models: models.value
    });

    console.log('All relevant states and localStorage have been cleared.');
  } catch (error) {
    console.error('Error clearing localStorage or resetting values:', error);
  }
};


</script>
<template>
<div>
  <h2>Chat with ChatGPT <a href="#" @click="clearKey()" v-if="openAIToken" class="clear-key">clear key</a></h2>
  <form v-if="!openAIToken" @submit.prevent="saveToken">
    <div>{{ props.description }}</div>
    Enter your <a href="https://platform.openai.com/account/api-keys" target="_blank" class="critical">OpenAI API token</a> 
    to get started.
    <div class="input-area">
      <input v-model="enteredToken" type="password" autocomplete="off" class="token-input"/>
      <button type="submit">Save to local storage</button>
    </div>
      <p class="note"><strong>Note:</strong> This token will be stored in your browser's local storage. 
        It will never be sent to any server other than OpenAI's. See our <a href="https://github.com/anvaka/map-of-github/blob/main/src/components/ChatContainer.vue" class="normal">source code</a> for details.
      </p>
  </form>
  
  <div v-if="loadingModels">Loading models...</div>
  <div v-if="errorMessage">{{ errorMessage }}</div>
  <chat-list :vm="props.vm" :models="models" v-if="models.length" />
</div>
</template>

<style scoped>
.token-input {
  font-size: 16px;
  padding: 4px;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  flex: 1;
  color: var(--color-text);
}
.token-input:focus, .token-input:active {
  outline: none;
  background-color: var(--color-background-mute);
}
.input-area {
  display: flex;
  margin: 8px 0; 
}
a.clear-key {
  font-size: 12px;
  color: var(--color-link-hover);
  text-decoration: none;
  float: right;
}
.note {
  font-size: 12px;
  color: var(--color-text-muted);
}
.note strong {
  font-weight: bold;
}
</style>