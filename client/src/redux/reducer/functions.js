export const _filteringType = (data, payload) => {
  if (payload !== '') {
    return data.filter((pokemon) =>
      pokemon.types.some((type) => type.name === payload)
    );
  }
};

export const _filteringOrder = (data, payload) => {
  if (['A-Z', 'Z-A'].includes(payload)) {
    return data.sort((a, b) => {
      if (payload === 'A-Z') {
        if (a.name < b.name) return -1;
        if (b.name < a.name) return 1;
        return 0;
      } else {
        if (b.name < a.name) return -1;
        if (a.name < b.name) return 1;
        return 0;
      }
    });
  } else {
    return data.sort((a, b) => {
      if (payload === 'ATK-') {
        if (Number(a.attack) < Number(b.attack)) return -1;
        if (Number(b.attack) < Number(a.attack)) return 1;
        return 0;
      } else {
        if (Number(b.attack) < Number(a.attack)) return -1;
        if (Number(a.attack) < Number(b.attack)) return 1;
        return 0;
      }
    });
  }
};
