import WebApp from "@twa-dev/sdk";
import { Account, TonProofItemReplySuccess } from "@tonconnect/ui-react";

import env from "./env";
import type { KeyValue } from "./types";
import { sha256 } from "./utils";

export async function checkProof(
  form: KeyValue,
  reply: TonProofItemReplySuccess,
  account: Account,
) {
  const url = `${env.BACKEND_URL}/api/form`;

  const payload = {
    form,
    tonproof: reply.proof,
    account: {
      stateInit: account.walletStateInit,
      network: account.chain,
      address: account.address,
      publicKey: account.publicKey,
    },
    tgAccount: WebApp.initDataUnsafe.user,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(res.statusText);
}

export async function proofPayload(form: KeyValue) {
  const keys = Object.keys(form).sort();

  const query = keys
    .reduce(
      (acc: string[], key) => acc.concat(key + "=" + String(form[key])),
      [],
    )
    .join("&");

  const sha = await sha256(query);
  return sha;
}
