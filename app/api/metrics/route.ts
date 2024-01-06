async function createEvent(event: string, timestamp: string, note?: string) {
  await fetch(process.env.ANALYTICS_ENDPOINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.ANALYTICS_KEY}`,
    },
    body: JSON.stringify({
      event,
      timestamp,
      note,
    }),
  });
}

/**
 * Sends an anonymous event to the server.
 * @param event Name to identify the event
 * @param note Optional note to add to the event
 */
const trackEvent = async (event: string, note?: string) => {
  const isDev = process.env.DEV;
  const extraNote = isDev ? "DEV" : note;

  try {
    const timestamp = new Date().toISOString();
    await createEvent(event, timestamp, extraNote);
  } catch (error) {
    console.error(error);
    return;
  }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (name) {
    await trackEvent(name);
  }

  return Response.json({ ok: true });
}
