import { Avatar, Cell, List, Section, Title } from "@telegram-apps/telegram-ui";

import { getPublicUrl } from "../common/utils";
import { useFetch } from "../hooks/useFetch";
import type { Template } from "../common/types";

import { Ton } from "./Ton";
import { VTField } from "./VTField";
import { useForm } from "./form/useForm";
import { Form } from "./form/Form";

type VTFormProps = {
  appId: string;
};

export function VTForm({ appId }: VTFormProps) {
  // Here will be request to real backend
  const url = getPublicUrl(`templates/${appId}.json`);
  const { data, loading, error } = useFetch<Template>(url);

  const form = useForm();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

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
      <Section>
        <Form instance={form}>
          <List className="p-6">
            {data.form.map((field) => (
              <VTField key={field.key} field={field} />
            ))}
          </List>
        </Form>
      </Section>
      <Section>
        <Ton />
      </Section>
    </List>
  );
}
