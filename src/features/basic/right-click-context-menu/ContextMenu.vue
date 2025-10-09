<script setup lang="ts">
import MaterialIcon from '@src/components/MaterialIcon.vue';
import ContextMenuItem from './ContextMenuItem.vue';
import { contextMenu, ContextMenuCommand } from './right-click-context-menu';

const menuCommands: ContextMenuCommand[] = [
  { cmd: 'CXPO', exchange: 'AI1' },
  { cmd: 'CXOB', exchange: 'AI1' },
  { cmd: 'CXPC', exchange: 'AI1' },
];

const onItemClick = (cmd: ContextMenuCommand) => {
  contextMenu.showBuffer(cmd);
};

const label = (cmd: ContextMenuCommand, materialID: string) => {
  return `${cmd.cmd} ${materialID}.${cmd.exchange}`;
};
</script>

<template>
  <div v-if="contextMenu.materialID" :class="$style.contextMenu" :style="contextMenu.menuStyle">
    <ul :class="[$style.contextMenuItems]">
      <ContextMenuItem
        v-for="cmd in menuCommands"
        :key="cmd.cmd"
        :label="label(cmd, contextMenu.materialID)"
        @click="onItemClick(cmd)" />
    </ul>
  </div>
</template>

<style module>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 4px 0 4px 4px;
}

.contextMenu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  /* Taken from Frame.Sidebar, re-using the class causes things to break*/
  background: linear-gradient(to right, #262626 0, #191919 100%) repeat-x;
  /* I'm not sure if this is high enough forever, but it works for now */
  z-index: 9999;
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
