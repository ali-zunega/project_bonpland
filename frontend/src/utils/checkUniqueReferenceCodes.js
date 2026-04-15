export const checkUniqueReferenceCodes = (properties) => {
  const map = new Map();
  const duplicates = [];

  properties.forEach((prop) => {
    const code = prop.reference_code;
    if (!code) return;

    if (!map.has(code)) {
      map.set(code, [prop]);
    } else {
      map.get(code).push(prop);
    }
  });

  map.forEach((items, code) => {
    if (items.length > 1) {
      duplicates.push({
        reference_code: code,
        properties: items.map((p) => ({
          id: p.id,
          title: p.title,
        })),
      });
    }
  });

  return {
    isValid: duplicates.length === 0,
    duplicates,
  };
};
