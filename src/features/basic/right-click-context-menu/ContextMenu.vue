<script setup lang="ts">
import MaterialIcon from '@src/components/MaterialIcon.vue';
import ContextMenuItem from './ContextMenuItem.vue';
import { contextMenu, ContextMenuCommand } from './right-click-context-menu';

const items: ContextMenuCommand[] = [
  { cmd: 'CXPO', label: 'Place Order', exchange: 'AI1' },
  { cmd: 'CXOB', label: 'Order Book', exchange: 'AI1' },
  { cmd: 'CXPC', label: 'Chart', exchange: 'AI1' },
];

const onItemClick = (item: ContextMenuCommand) => {
  contextMenu.showBuffer(item);
};
</script>

<template>
  <div v-if="contextMenu.materialID" :class="$style.contextMenu" :style="contextMenu.menuStyle">
    <div :class="$style.materialIcon">
      <MaterialIcon :ticker="contextMenu.materialID" size="medium" />
    </div>
    <ul :class="$style.contextMenuItems">
      <ContextMenuItem
        v-for="item in items"
        :key="item.cmd"
        :label="item.label"
        @click="onItemClick(item)" />
    </ul>
  </div>
</template>

<style module>
.contextMenu {
  position: absolute;
  color: #fff;
  border: 1px solid #25343d;
  background: #262626;
  border-color:;
  width: 120px;
  padding: 3px;
  z-index: 9999; /* I'm not sure if this is high enough forever, but it works for now */
}

.materialIcon {
  margin-bottom: 6px;
}

.contextMenuItems {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
