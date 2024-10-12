import { Spinner } from "@telegram-apps/telegram-ui";

export function Loader() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="text-center">
        <Spinner size="l" />
        <div>Loading...</div>
      </div>
    </div>
  );
}
