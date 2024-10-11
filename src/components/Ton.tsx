import { Avatar, Cell, Section, Title } from "@telegram-apps/telegram-ui";
import {
  TonConnectButton,
  useTonAddress,
  useTonWallet,
} from "@tonconnect/ui-react";

import { Debug } from "./Debug";

export function Ton() {
  const wallet = useTonWallet();
  const friendlyAddress = useTonAddress(true);

  if (!wallet) {
    return (
      <Section header="TON Connect">
        <div className="p-6">
          <TonConnectButton />
        </div>
      </Section>
    );
  }

  return (
    <Section>
      {"name" in wallet && (
        <Cell
          subtitle={wallet.appName}
          before={
            <Avatar
              src={wallet.imageUrl}
              alt="Provider logo"
              width={60}
              height={60}
            />
          }
          after={<TonConnectButton />}
        >
          <Title level="3">{wallet.name}</Title>
        </Cell>
      )}
      <div className="p-6">
        <Debug value={{ ...wallet, friendlyAddress }} />
      </div>
    </Section>
  );
}
