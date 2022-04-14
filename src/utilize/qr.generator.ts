import * as QRCode from "qrcode";

export default async (data: string) => {
  return await QRCode.toDataURL(data);
};
