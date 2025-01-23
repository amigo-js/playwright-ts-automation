export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const logWithTimestamp = (message: string): void => {
  console.log(`[${new Date().toISOString()}] ${message}`);
};

export const waitForElement = async (
  element: Promise<import("@playwright/test").Locator>,
  timeout: number = 5000
): Promise<void> => {
  await (await element).waitFor({ timeout });
};
