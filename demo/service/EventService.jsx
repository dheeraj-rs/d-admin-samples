export const EventService = {
  async getEvents() {
    const res = await fetch('/demo/data/events.json', {
      headers: { 'Cache-Control': 'no-cache' },
    });
    const d = await res.json();
    return d.data;
  },
};
