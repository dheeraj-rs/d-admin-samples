let icons = [];

export const IconService = {
  async getIcons() {
    if (icons.length === 0) {
      const res = await fetch('/demo/data/icons.json', {
        headers: { 'Cache-Control': 'no-cache' },
      });
      const d = await res.json();
      icons = d.icons;
    }
    return icons;
  },

  getIcon(id) {
    if (icons.length > 0) {
      return icons.find((x) => x.properties?.id === id);
    }
    return null;
  },
};
