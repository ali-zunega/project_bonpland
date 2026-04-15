const TYPE_PREFIX = {
  apartment: "APT",
  house: "HOU",
  land: "LAN",
  commercial: "COM",
};

export const generateRandomCode = (length = 4) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
};

export const generateReferenceCode = (type) => {
  const prefix = TYPE_PREFIX[type];
  console.log(
    "Generating reference code for type:",
    type,
    "with prefix:",
    prefix,
  );

  if (!prefix) {
    throw new Error("Invalid property type for reference code");
  }

  const randomCode = generateRandomCode(4);

  return `${prefix}-${randomCode}`;
};
