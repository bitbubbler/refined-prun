import { showBuffer } from '@src/infrastructure/prun-ui/buffers';
import { refTextContent } from '@src/utils/reactive-dom';
import { CSSProperties } from 'vue';
import ContextMenu from './ContextMenu.vue';

interface ExchangeCommand {
  exchange: string;
}

interface Trade extends ExchangeCommand {
  cmd: 'CXPO';
}

interface Orders extends ExchangeCommand {
  cmd: 'CXOB';
}

interface Chart extends ExchangeCommand {
  cmd: 'CXPC';
}

export type ContextMenuCommand = Trade | Orders | Chart;

type ContextMenuReactive = {
  // properties
  materialID: string | null;
  menuElement: HTMLElement | null;
  menuStyle: CSSProperties;
  // methods
  hideMenu: () => void;
  hideOnClickOutside: (event: MouseEvent) => void;
  setLocation: (event: MouseEvent) => void;
  setMenuElement: (element: HTMLElement) => void;
  showBuffer: (cmd: ContextMenuCommand) => void;
  showMenu: (ticker: string) => void;
};

export const contextMenu = reactive<ContextMenuReactive>({
  materialID: null,
  menuElement: null,
  menuStyle: {
    display: 'none',
  },
  hideMenu() {
    this.materialID = null;
    this.menuStyle.display = 'none';
  },
  setLocation(event: MouseEvent) {
    this.menuStyle.left = `${event.clientX}px`;
    this.menuStyle.top = `${event.clientY}px`;
  },
  setMenuElement(element: HTMLElement) {
    this.menuElement = element;
  },
  showMenu(ticker: string) {
    this.materialID = ticker;
    this.menuStyle.display = 'block';
  },
  showBuffer(cmd: ContextMenuCommand) {
    if (cmd.cmd === 'CXPO' || cmd.cmd === 'CXOB' || cmd.cmd === 'CXPC') {
      // TODO: use the cmd string here...
      showBuffer(`${cmd.cmd} ${this.materialID}.${cmd.exchange}`);
    }

    // hide the menu after so the materialId is still available for the buffer
    this.hideMenu();
  },
  hideOnClickOutside(event: MouseEvent) {
    const target = event?.target;
    if (target instanceof HTMLElement === false) {
      return;
    }
    // hide the menu if we click anywhere outside of it
    if (!this.menuElement?.contains(target)) {
      this.hideMenu();
    }
  },
});

function init() {
  const container = document.getElementById('container');
  if (container) {
    const menuElement = createFragmentApp(ContextMenu).appendTo(container);

    contextMenu.setMenuElement(menuElement.$el);
  }

  document.addEventListener('click', e => {
    contextMenu.hideOnClickOutside(e);
  });

  document.addEventListener('contextmenu', e => {
    const target = e?.target;

    // no target, no context menu
    if (target instanceof HTMLElement === false) {
      return;
    }

    const closestMaterialIconContainer = target?.closest(`.${C.ColoredIcon.container}`);

    // no material icon container, no context menu
    if (!closestMaterialIconContainer) {
      return;
    }

    const ticker = refTextContent(closestMaterialIconContainer).value;

    // no ticker, no context menu
    if (!ticker) {
      return;
    }

    e.preventDefault();
    contextMenu.setLocation(e);
    contextMenu.showMenu(ticker);
  });
}

features.add(import.meta.url, init, 'Right clicking on a material shows a context menu.');
