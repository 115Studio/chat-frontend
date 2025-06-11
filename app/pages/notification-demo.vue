<template>
  <div class="notification-demo">
    <h1>Notification Demo</h1>
    <p>Click the buttons below to test different notification styles and positions:</p>

    <div class="demo-section">
      <h2>Basic Notifications</h2>
      <div class="button-grid">
        <button @click="showBasic" class="demo-btn">Basic</button>
        <button @click="showWithIcon" class="demo-btn">With Icon</button>
        <button @click="showWithProgress" class="demo-btn">With Progress</button>
        <button @click="showLongDuration" class="demo-btn">Long Duration</button>
      </div>
    </div>

    <div class="demo-section">
      <h2>Color Variants</h2>
      <div class="button-grid">
        <button @click="showSuccess" class="demo-btn success">Success</button>
        <button @click="showError" class="demo-btn danger">Error</button>
        <button @click="showWarning" class="demo-btn warning">Warning</button>
        <button @click="showInfo" class="demo-btn primary">Info</button>
      </div>
    </div>

    <div class="demo-section">
      <h2>Positions</h2>
      <div class="position-grid">
        <button @click="showTopLeft" class="demo-btn position-btn">Top Left</button>
        <button @click="showTopCenter" class="demo-btn position-btn">Top Center</button>
        <button @click="showTopRight" class="demo-btn position-btn">Top Right</button>
        <button @click="showBottomLeft" class="demo-btn position-btn">Bottom Left</button>
        <button @click="showBottomCenter" class="demo-btn position-btn">Bottom Center</button>
        <button @click="showBottomRight" class="demo-btn position-btn">Bottom Right</button>
      </div>
    </div>

    <div class="demo-section">
      <h2>Style Variants</h2>
      <div class="button-grid">
        <button @click="showSquare" class="demo-btn">Square</button>
        <button @click="showBorder" class="demo-btn">Border</button>
        <button @click="showFlat" class="demo-btn">Flat</button>
        <button @click="showCustomWidth" class="demo-btn">Custom Width</button>
      </div>
    </div>

    <div class="demo-section">
      <h2>Interactive</h2>
      <div class="button-grid">
        <button @click="showSticky" class="demo-btn">Sticky (No Auto Close)</button>
        <button @click="showManualProgress" class="demo-btn">Manual Progress</button>
        <button @click="showClosable" class="demo-btn">Non-closable</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotification } from '@app/composables/useNotification'

const { notification, success, error, warning, info } = useNotification()

let manualProgressNotification: any = null

const showBasic = () => {
  notification({
    title: 'Basic Notification',
    text: 'This is a basic notification with default styling.'
  })
}

const showWithIcon = () => {
  notification({
    title: 'With Icon',
    text: 'This notification includes an icon.',
    icon: '<i class="icon">🔔</i>',
    color: 'primary'
  })
}

const showWithProgress = () => {
  notification({
    title: 'Auto Progress',
    text: 'This notification shows automatic progress.',
    progress: 'auto',
    color: 'success',
    duration: 6000
  })
}

const showLongDuration = () => {
  notification({
    title: 'Long Duration',
    text: 'This notification will stay for 10 seconds.',
    duration: 10000,
    color: 'warning'
  })
}

const showSuccess = () => {
  success({
    title: 'Success!',
    text: 'Your operation completed successfully.',
    icon: '<i class="icon">✅</i>'
  })
}

const showError = () => {
  error({
    title: 'Error!',
    text: 'Something went wrong. Please try again.',
    icon: '<i class="icon">❌</i>'
  })
}

const showWarning = () => {
  warning({
    title: 'Warning!',
    text: 'Please review your input before proceeding.',
    icon: '<i class="icon">⚠️</i>'
  })
}

const showInfo = () => {
  info({
    title: 'Information',
    text: 'Here is some important information for you.',
    icon: '<i class="icon">ℹ️</i>'
  })
}

const showTopLeft = () => {
  notification({
    title: 'Top Left',
    text: 'Positioned at top left corner.',
    position: 'top-left',
    color: 'primary'
  })
}

const showTopCenter = () => {
  notification({
    title: 'Top Center',
    text: 'Positioned at top center.',
    position: 'top-center',
    color: 'success'
  })
}

const showTopRight = () => {
  notification({
    title: 'Top Right',
    text: 'Positioned at top right corner.',
    position: 'top-right',
    color: 'danger'
  })
}

const showBottomLeft = () => {
  notification({
    title: 'Bottom Left',
    text: 'Positioned at bottom left corner.',
    position: 'bottom-left',
    color: 'warning'
  })
}

const showBottomCenter = () => {
  notification({
    title: 'Bottom Center',
    text: 'Positioned at bottom center.',
    position: 'bottom-center',
    color: 'dark'
  })
}

const showBottomRight = () => {
  notification({
    title: 'Bottom Right',
    text: 'Positioned at bottom right corner.',
    position: 'bottom-right',
    color: 'primary'
  })
}

const showSquare = () => {
  notification({
    title: 'Square Notification',
    text: 'This notification has square corners.',
    square: true,
    color: 'success'
  })
}

const showBorder = () => {
  notification({
    title: 'Border Notification',
    text: 'This notification has a thick border.',
    border: true,
    color: 'primary'
  })
}

const showFlat = () => {
  notification({
    title: 'Flat Notification',
    text: 'This notification has no shadow.',
    flat: true,
    color: 'warning'
  })
}

const showCustomWidth = () => {
  notification({
    title: 'Custom Width',
    text: 'This notification has a custom width of 500px.',
    width: '500px',
    color: 'danger'
  })
}

const showSticky = () => {
  notification({
    title: 'Sticky Notification',
    text: 'This notification will not auto-close. Click the X to close.',
    duration: 'none',
    color: 'dark',
    icon: '<i class="icon">📌</i>'
  })
}

const showManualProgress = () => {
  manualProgressNotification = notification({
    title: 'Manual Progress',
    text: 'Progress is controlled manually.',
    progress: 0,
    duration: 'none',
    color: 'primary'
  })

  // Simulate manual progress updates
  let progress = 0
  const interval = setInterval(() => {
    progress += 10
    manualProgressNotification.changeProgress(progress)

    if (progress >= 100) {
      clearInterval(interval)
      setTimeout(() => {
        manualProgressNotification.close()
      }, 1000)
    }
  }, 500)
}

const showClosable = () => {
  notification({
    title: 'Non-closable',
    text: 'This notification has no close button.',
    closable: false,
    duration: 3000,
    color: 'success'
  })
}
</script>

<style scoped lang="scss">
.notification-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: system-ui, -apple-system, sans-serif;
}

h1 {
  color: #333;
  margin-bottom: 10px;
}

p {
  color: #666;
  margin-bottom: 40px;
}

.demo-section {
  margin-bottom: 40px;

  h2 {
    color: #333;
    margin-bottom: 20px;
    font-size: 1.5rem;
  }
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.position-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.demo-btn {
  padding: 12px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #7367f0;
    color: #7367f0;
    transform: translateY(-1px);
  }

  &.success {
    border-color: #28c76f;
    color: #28c76f;

    &:hover {
      background: #28c76f;
      color: white;
    }
  }

  &.danger {
    border-color: #ea5455;
    color: #ea5455;

    &:hover {
      background: #ea5455;
      color: white;
    }
  }

  &.warning {
    border-color: #ff9f43;
    color: #ff9f43;

    &:hover {
      background: #ff9f43;
      color: white;
    }
  }

  &.primary {
    border-color: #7367f0;
    color: #7367f0;

    &:hover {
      background: #7367f0;
      color: white;
    }
  }

  &.position-btn {
    padding: 8px 12px;
    font-size: 12px;
  }
}

.icon {
  font-style: normal;
  font-size: 16px;
}
</style>
