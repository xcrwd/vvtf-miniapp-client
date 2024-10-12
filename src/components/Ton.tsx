import { Avatar, Cell, Title } from "@telegram-apps/telegram-ui";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";

export function Ton() {
  const wallet = useTonWallet();

  const hasWallet = wallet && "name" in wallet;

  if (!hasWallet) {
    return (
      <Cell>
        <TonConnectButton />
      </Cell>
    );
  }

  return (
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
  );
}
