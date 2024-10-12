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

  if (loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  const isValid = validateForm(form.values, data.form);

  return (
    <List>
      <Section>
        <List className="p-4">
          {data.imageUrl && (
            <div className="flex justify-center">
              <img src={data.imageUrl} />
            </div>
          )}
          {data.title && (
            <div className="font-tg-sans font-semibold text-xl">
              {data.title}
            </div>
          )}
          {data.subtitle && (
            <div className="font-tg-sans text-tg-subtitle whitespace-pre-line">
              {data.subtitle}
            </div>
          )}
        </List>
      </Section>
      {done ? (
        <Section className="p-4">Success</Section>
      ) : (
        <>
          <Section>
            <Form instance={form}>
              <List className="p-6">
                {data.form.map((field) => (
                  <VTField key={field.key} field={field} />
                ))}
              </List>
            </Form>
          </Section>
          <div className="m-4">
            <Button
              size="l"
              stretched
              disabled={!isValid}
              onClick={() => tonConnectUI.openModal()}
            >
              Submit
            </Button>
          </div>
        </>
      )}
    </List>
  );
}
