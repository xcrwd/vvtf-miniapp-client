import {
  Avatar,
  Button,
  Cell,
  List,
  Section,
  Title,
} from "@telegram-apps/telegram-ui";
import { useTonConnectUI } from "@tonconnect/ui-react";

import { getPublicUrl } from "../common/utils";
import { useFetch } from "../hooks/useFetch";
import { useTonProof } from "../hooks/useTonProof";
import type { Template } from "../common/types";

import { useForm } from "./form/useForm";
import { Form } from "./form/Form";
import { VTField } from "./VTField";
import { validateForm } from "../common/form";

type VTFormProps = {
  appId: string;
};

export function VTForm({ appId }: VTFormProps) {
  const [tonConnectUI] = useTonConnectUI();

  // Here will be request to real backend
  const url = getPublicUrl(`templates/${appId}.json`);
  const { data, loading, error } = useFetch<Template>(url);

  const form = useForm();

  const done = useTonProof(form.values);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  const isValid = validateForm(form.values, data.form);

  const logo = data.imageUrl ? (
    <Avatar src={data.imageUrl} alt="Org logo" width={60} height={60} />
  ) : undefined;

  return (
    <List>
      <Section>
        <Cell subtitle={data.subtitle} before={logo}>
          <Title level="1">{data.title}</Title>
        </Cell>
      </Section>
      {done ? (
        <Section>Success</Section>
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
            <Button
              size="m"
              stretched
              disabled={!isValid}
              onClick={() => tonConnectUI.openModal()}
            >
              Submit
            </Button>
        </>
      )}
    </List>
  );
}
