import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Button } from "@heroui/button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { Product } from "@/types/products";

type InventoryModalProps = {
  open: boolean;
  onClose: () => void;
  products: Product[];
};

const InventoryModal: React.FC<InventoryModalProps> = ({
  open,
  onClose,
  products,
}) => {
  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.text("Inventário Diário de Produtos", 14, 16);

    autoTable(doc, {
      startY: 22,
      head: [["ID", "Nome", "Categoria", "Estoque", "Validade"]],
      body: products.map((product) => [
        product.id ?? "",
        product.name ?? "",
        product.category ?? "",
        product.stock_quantity ?? 0,
        product.expiration_date
          ? new Date(product.expiration_date).toLocaleDateString()
          : "",
      ]),
    });

    doc.save("inventario.pdf");
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={open}
      scrollBehavior="inside"
      size="5xl"
      onOpenChange={onClose}
    >
      <ModalContent>
        <ModalHeader>Inventário Diário</ModalHeader>
        <ModalBody>
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr>
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Nome</th>
                  <th className="p-2 border">Categoria</th>
                  <th className="p-2 border">Estoque</th>
                  <th className="p-2 border">Validade</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="p-2 border text-center">{product.id}</td>
                    <td className="p-2 border">{product.name}</td>
                    <td className="p-2 border">{product.category}</td>
                    <td className="p-2 border text-center">
                      {product.stock_quantity}
                    </td>
                    <td className="p-2 border text-center">
                      {new Date(product.expiration_date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-6">
            <Button color="secondary" onPress={exportToPDF}>
              Exportar em PDF
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InventoryModal;
