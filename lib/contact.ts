const WHATSAPP_BASE_URL = "https://wa.me";

export function buildWhatsAppUrl(
  number: string | undefined,
  message: string,
): string {
  const normalizedNumber = number?.replace(/\D/g, "") ?? "";
  const encodedMessage = encodeURIComponent(message);
  const contactPath = normalizedNumber ? `/${normalizedNumber}` : "/";

  return `${WHATSAPP_BASE_URL}${contactPath}?text=${encodedMessage}`;
}
