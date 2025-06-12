import Url from "../models/Url.js";

const shortId = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let str = "";
  for (let i = 0; i < 5; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
};

const generateId = async (originalUrl) => {
  const newId = shortId();
  const newUrl = new Url({
    originalUrl: originalUrl,
    shortId: newId,
  });
  await newUrl.save();
  return newId;
};

const goToUrl = async (shortId) => {
  const urlEntry = await Url.findOne({ shortId: shortId });
  if (urlEntry) {
    return urlEntry.originalUrl;
  } else {
    throw new Error("url not found");
  }
};

export { generateId, goToUrl };
