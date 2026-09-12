import { FrictionEvent } from "./frictionEngine";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function sendFrictionEvent(
  event: FrictionEvent
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/friction-events`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to send friction event: ${response.status}`
    );
  }
}