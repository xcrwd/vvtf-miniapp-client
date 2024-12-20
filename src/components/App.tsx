import WebApp from "@twa-dev/sdk";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

import { getPublicUrl, getQueryParams } from "../common/utils";

import { ErrorBoundary } from "./ErrorBoundary";
import { ErrorFallback } from "./ErrorFallback";
import { VTForm } from "./VTForm";

export function App() {
  const manifestUrl = getPublicUrl("tonconnect-manifest.json");
  const platform = ["macos", "ios"].includes(WebApp.platform) ? "ios" : "base";
  const startapp = getQueryParams().get("startapp") || "not-exists";

  WebApp.MainButton.text = "Bye!"
  WebApp.MainButton.onClick(() => WebApp.close());

  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <AppRoot appearance={WebApp.colorScheme} platform={platform}>
          <VTForm appId={startapp} />
        </AppRoot>
      </TonConnectUIProvider>
    </ErrorBoundary>
  );
}
