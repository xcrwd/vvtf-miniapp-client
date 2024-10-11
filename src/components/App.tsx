import WebApp from "@twa-dev/sdk";
import { AppRoot, List } from "@telegram-apps/telegram-ui";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

import { ErrorBoundary } from "./ErrorBoundary";
import { ErrorFallback } from "./ErrorFallback";
import { AppInfo } from "./AppInfo";
import { Ton } from "./Ton";

const manifestUrl = new URL(
  "tonconnect-manifest.json",
  window.location.origin,
).toString();

// TODO back/exit, onExit, tailwind, app button in bot menu, app MainButton, sendData from app to bot, deploy to gh-pages

export function App() {
  const platform = ["macos", "ios"].includes(WebApp.platform) ? "ios" : "base";

  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <AppRoot appearance={WebApp.colorScheme} platform={platform}>
          <List className="p-20">
            <Ton />
            <AppInfo />
          </List>
        </AppRoot>
      </TonConnectUIProvider>
    </ErrorBoundary>
  );
}
