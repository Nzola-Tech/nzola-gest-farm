import { ThemeSwitch } from '../theme-switch';
import './style.css';
import { getCurrentWindow } from '@tauri-apps/api/window';

export default function TitleBar() {
    const appWindow = getCurrentWindow()
    
    return (
        <div className="titlebar">
            <div data-tauri-drag-region></div>
            <div className="controls">
                <ThemeSwitch/>
                <button id="titlebar-minimize" title="minimize"
                    onClick={async () => await appWindow.minimize()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19 13H5v-2h14z" />
                    </svg>
                </button>
                <button id="titlebar-close" title="close"
                    onClick={async () => await appWindow.close()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M13.46 12L19 17.54V19h-1.46L12 13.46L6.46 19H5v-1.46L10.54 12L5 6.46V5h1.46L12 10.54L17.54 5H19v1.46z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
