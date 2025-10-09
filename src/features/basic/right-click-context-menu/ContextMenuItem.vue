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
  padding: 0 6px 0 8px;
  line-height: 19px;
  color: #999;
  text-transform: uppercase;
}
</style>
