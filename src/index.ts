import { Injector, webpack } from "replugged";

const injector = new Injector();
let intervalId: NodeJS.Timeout | null = null;

export function waitForValue(): Promise<any> {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const v = webpack.getByProps("getCurrentUser").getCurrentUser();
      if (typeof v !== "undefined") {
        if (v.hasOwnProperty("email")) {
          clearInterval(interval);
          resolve(v);
        }
      }
    }, 1);
  });
}

export async function start(): Promise<void> {
  const v = await waitForValue();

  v.email = "me@example.com";
  v.username = "Me";
  v.phone = "+1 234 567 8901";
  v.globalName = "Me";
}

export function stop(): void {
  injector.uninjectAll();

  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}
