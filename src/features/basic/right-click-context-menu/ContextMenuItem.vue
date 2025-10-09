<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<template>
  <div :class="$style.contextMenuItem">
    <span :class="[$style.label, C.fonts.fontRegular, C.type.typeLarge]">{{ label }}</span>
  </div>
</template>

<style module>
.contextMenuItem {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 1px;
  background-color: rgba(255, 255, 255, 0.05);
  cursor: pointer;
}

.label {
  padding: 2px 4px;
  line-height: 19px;
  color: #999;
  text-transform: uppercase;
  flex-grow: 1;
  transition: background-color 0.1s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
}
</style>
