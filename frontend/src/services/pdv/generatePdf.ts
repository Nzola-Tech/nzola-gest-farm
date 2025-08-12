import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CartItem } from "@/types/pdv";

interface ClienteInfo {
  name: string;
  nif?: string;
}

export function generatePDF(
  cart: CartItem[],
  total: number,
  paymentMethod: string,
  invoiceNumber: string,
  cliente: ClienteInfo
): string {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Nzola Gest Farmácia", 14, 20);
  doc.setFontSize(10);
  doc.text("NIF: 1234567", 14, 26);
  doc.text(`Fatura Nº: ${invoiceNumber}`, 14, 32);
  doc.text(`Cliente: ${cliente.name}`, 14, 38);
  if (cliente.nif) doc.text(`NIF Cliente: ${cliente.nif}`, 14, 44);
  doc.text(`Pagamento: ${paymentMethod}`, 14, 50);

  autoTable(doc, {
    startY: 56,
    head: [["Produto", "Qtd", "Preço Unit.", "Subtotal"]],
    body: cart.map((item) => [
      item.name,
      item.quantity.toString(),
      item.sale_price.toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
      (item.sale_price * item.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
    ]),
    styles: { fontSize: 9 },
  });

  const finalY = (doc as any).lastAutoTable.finalY || 56;

  doc.setFontSize(12);
  doc.text(`Total: ${total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} KZ`, 14, finalY + 10);
  doc.setFontSize(9);
  doc.text("Obrigado pela preferência!", 14, finalY + 18);

  // Retorna URL blob para preview em iframe ou abrir em nova aba
  return doc.output("bloburl").toString();
}
