import { ThemeSwitch } from "../theme-switch";

import "./style.css";
import { getCurrentWindow } from "@tauri-apps/api/window";

export default function TitleBar() {
  const appWindow = getCurrentWindow();

  return (
    <div className="titlebar">
      <div data-tauri-drag-region />
      <div className="controls">
        <ThemeSwitch />
        <button
          id="titlebar-minimize"
          title="minimize"
          onClick={async () => await appWindow.minimize()}
        >
          <svg
            height="20"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 13H5v-2h14z" fill="currentColor" />
          </svg>
        </button>
        <button
          id="titlebar-close"
          title="close"
          onClick={async () => await appWindow.close()}
        >
          <svg
            height="20"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.46 12L19 17.54V19h-1.46L12 13.46L6.46 19H5v-1.46L10.54 12L5 6.46V5h1.46L12 10.54L17.54 5H19v1.46z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
