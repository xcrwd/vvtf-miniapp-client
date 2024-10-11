import WebApp from "@twa-dev/sdk";
import { Section } from "@telegram-apps/telegram-ui";

import { fromIterable, getQueryParams } from "../common/utils";
import { Debug } from "./Debug";

const query = getQueryParams();

export function AppInfo() {
  const info = {
    platform: WebApp.platform,
    version: WebApp.version,
    data: WebApp.initDataUnsafe,
    query: fromIterable(query),
    theme: WebApp.themeParams,
  };

  return (
    <Section header="App Info">
      <div className="p-6">
        <Debug value={info} />
      </div>
    </Section>
  );
}
