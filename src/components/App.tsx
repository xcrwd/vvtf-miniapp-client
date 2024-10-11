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

// TODO BackButton, MainButton, closingConfirmation, sendData, README

export function App() {
  const platform = ["macos", "ios"].includes(WebApp.platform) ? "ios" : "base";

  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <AppRoot appearance={WebApp.colorScheme} platform={platform}>
          <List className="p-8">
            <Ton />
            <AppInfo />
          </List>
        </AppRoot>
      </TonConnectUIProvider>
    </ErrorBoundary>
  );
}
