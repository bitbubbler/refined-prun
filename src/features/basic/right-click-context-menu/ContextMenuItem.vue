<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<template>
  <div :class="$style.contextMenuItem">
    <span :class="$style.label">{{ label }}</span>
  </div>
</template>

<style module>
.contextMenuItem {
  display: flex;
  width: 100%;
  padding: 8px 6px;
  cursor: pointer;
}

.label {
  font-size: 12px;
}
</style>
