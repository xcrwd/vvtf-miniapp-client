import { Spinner } from "@telegram-apps/telegram-ui";

export function Loader() {
  return (
    <div className="flex justify-center">
      <Spinner size="l" />
    </div>
  );
}
