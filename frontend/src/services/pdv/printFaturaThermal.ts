// utils/printFaturaThermal.ts
import { invoke } from "@tauri-apps/api/core";

import { CartItem } from "@/types/pdv";

interface ClienteInfo {
  name: string;
  nif?: string;
}

export async function printFaturaThermal(
  cart: CartItem[],
  total: number,
  paymentMethod: string,
  invoiceNumber: string,
  cliente: ClienteInfo,
) {
  const lines: string[] = [];

  lines.push("  Nzola Gest Farmácia");
  lines.push("  NIF: 1234567");
  lines.push("------------------------------");
  lines.push(`Fatura Nº: ${invoiceNumber}`);
  lines.push(`Cliente: ${cliente.name}`);
  if (cliente.nif) lines.push(`NIF Cliente: ${cliente.nif}`);
  lines.push("------------------------------");

  cart.forEach((item) => {
    const subtotal = (item.sale_price * item.quantity).toFixed(2);

    lines.push(`${item.name} ${item.quantity}x ${item.sale_price.toFixed(2)}`);
    lines.push(`Total: ${subtotal}`);
  });

  lines.push("------------------------------");
  lines.push(`TOTAL: ${total.toFixed(2)} KZ`);
  lines.push(`Pagamento: ${paymentMethod}`);
  lines.push("------------------------------");
  lines.push("Obrigado pela preferência!");
  lines.push("\n\n\n");

  await invoke("print_invoice", { invoiceText: lines.join("\n") });
}
