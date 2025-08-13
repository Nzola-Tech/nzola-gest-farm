import { getCurrentWindow } from "@tauri-apps/api/window";
import { Menu, Submenu, MenuItem } from "@tauri-apps/api/menu";

const appWindow = getCurrentWindow();

export async function setupAppMenu() {
  const menuArquivo = await Submenu.new({
    text: "Arquivo",
    items: [
      await MenuItem.new({
        id: "novo",
        text: "Novo",
        action: () => console.log("Novo clicado"),
      }),
      await MenuItem.new({
        id: "sair",
        text: "Sair",
        action: () => appWindow.close(), // <- fecha a janela
      }),
    ],
  });

  const menuAjuda = await Submenu.new({
    text: "Ajuda",
    items: [
      await MenuItem.new({
        id: "sobre",
        text: "Sobre",
        action: () => console.log("Sobre clicado"),
      }),
    ],
  });

  const menu = await Menu.new({
    items: [menuArquivo, menuAjuda],
  });

  await menu.setAsAppMenu(); // Aplica o menu
}
