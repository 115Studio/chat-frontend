<script setup lang="ts">

</script>

<template>
  <div class="chat-input-container">
    <div class="input-container">
      <input class="input" type="text" placeholder="Ask anything" />
    </div>
    <div class="chat-input-actions">
      <div class="chat-input-actions__left">
        <button class="voice-button">Voice</button>
        <button class="clear-button">Clear</button>
        <button class="settings-button">Settings</button>
      </div>
      <div class="chat-input-actions__right">
        <button class="send-button">Send</button>
        <button class="attach-button">Attach</button>
        <button class="emoji-button">♥️</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat-input-container {
  background: var(--color-default);
  border: 1px solid var(--color-border-default);
  margin-right: auto;
  margin-left: auto;
  width: 65%;
  padding: 32px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  min-height: 104px; /* Adjust height as needed */
}

.input-container {
  flex-grow: 1;
  margin-bottom: 12px;
}

.input {
  width: 100%;
  min-height: 32px;
  padding: 12px 12px 12px 0;
  border: 1px solid var(--color-border-default);
  border-radius: 8px;
  font-size: 20px;
}

.chat-input-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;

  &__left {
    display: flex;
    gap: 8px;
  }

  &__right {
    display: flex;
    gap: 8px;
  }
}
</style>
