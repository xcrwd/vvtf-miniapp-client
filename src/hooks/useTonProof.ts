import { useEffect, useState } from "react";
import {
  useIsConnectionRestored,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";

import { checkProof, proofPayload } from "../common/tonProof";
import type { KeyValue } from "../common/types";

export function useTonProof(form: KeyValue, appId: string, apiUrl?: string) {
  const isConnectionRestored = useIsConnectionRestored();
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isConnectionRestored) return;

    if (!wallet) {
      tonConnectUI.setConnectRequestParameters({ state: "loading" });

      proofPayload(form)
        .then((payload) => {
          tonConnectUI.setConnectRequestParameters({
            state: "ready",
            value: { tonProof: payload },
          });
        })
        .catch(() => {
          tonConnectUI.setConnectRequestParameters(null);
        });
      return;
    }

    const tonProof = wallet.connectItems?.tonProof;

    if (!tonProof) {
      tonConnectUI.disconnect();
      return;
    }

    if ("error" in tonProof) {
      alert(tonProof.error);
      tonConnectUI.disconnect();
      return;
    }

    checkProof(form, tonProof, wallet.account, appId, apiUrl)
      .then(() => {
        setDone(true);
      })
      .catch((err) => {
        alert(err.message || "Invalid Ton proof");
        tonConnectUI.disconnect();
      });
  }, [form, appId, apiUrl, wallet, isConnectionRestored, tonConnectUI]);

  return done;
}
