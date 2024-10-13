import WebApp from "@twa-dev/sdk";
import { Button, List, Section } from "@telegram-apps/telegram-ui";
import { useTonConnectUI } from "@tonconnect/ui-react";

import { getPublicUrl } from "../common/utils";
import { validateForm } from "../common/form";
import { useFetch } from "../hooks/useFetch";
import { useTonProof } from "../hooks/useTonProof";
import type { Template } from "../common/types";

import { useForm } from "./form/useForm";
import { Form } from "./form/Form";
import { VTField } from "./VTField";
import { Loader } from "./Loader";

type VTFormProps = {
  appId: string;
};

export function VTForm({ appId }: VTFormProps) {
  const [tonConnectUI] = useTonConnectUI();

  // Here will be request to real backend
  const url = getPublicUrl(`templates/${appId}.json`);
  const { data, loading, error } = useFetch<Template>(url);

  const form = useForm();

  const done = useTonProof(form.values, data?.apiUrl);

  WebApp.MainButton.isVisible = done;

  if (loading) {
    return (
      <div className="h-screen">
        <Loader />
      </div>
    );
  }
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  if (done) {
    return (
      <Section>
        <List className="p-4 text-center">
          <img src="success.png" />
          <div className="text-xl font-semibold">Congratulations!</div>
          <div className="text-tg-subtitle">
            Your request was sent successfully!
          </div>
        </List>
      </Section>
    );
  }

  const isValid = validateForm(form.values, data.form);

  return (
    <List>
      <Section>
        <List className="p-4">
          {data.imageUrl && (
            <div className="text-center">
              <img src={data.imageUrl} />
            </div>
          )}
          {data.title && (
            <div className="text-xl font-semibold">{data.title}</div>
          )}
          {data.subtitle && (
            <div className="text-tg-subtitle whitespace-pre-line">
              {data.subtitle}
            </div>
          )}
        </List>
      </Section>
      <Form instance={form}>
        {data.form.map((field) => (
          <Section key={field.key}>
            <VTField field={field} />
          </Section>
        ))}
      </Form>
      <section className="m-4">
        <Button
          size="l"
          stretched
          disabled={!isValid}
          onClick={() => tonConnectUI.openModal()}
        >
          Submit
        </Button>
      </section>
    </List>
  );
}
