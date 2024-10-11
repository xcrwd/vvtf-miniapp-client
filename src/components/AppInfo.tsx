import WebApp from "@twa-dev/sdk";
import { Section } from "@telegram-apps/telegram-ui";

import { Debug } from "./Debug";

export function AppInfo() {
  const info = {
    platform: WebApp.platform,
    version: WebApp.version,
    data: WebApp.initDataUnsafe,
    theme: WebApp.themeParams,
  };

  return (
    <Section header="App Info">
      <Debug className="p-6" value={info} />
    </Section>
  );
}
