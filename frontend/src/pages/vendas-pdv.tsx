import { useDisclosure } from "@heroui/modal";
import { useContext, useState } from "react";

import { EditProductQuantityModal } from "@/components/pdv/editProductQuantityModal";
import ProductsTable from "@/components/pdv/productsTable";
import { SellForm } from "@/components/pdv/sellForm";
import { PdvContext } from "@/context/pdv";
import DefaultLayout from "@/layouts/default";

export default function VendasPdv() {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );
  const [quantityProduct, setQuantityProduct] = useState<number | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { updateQuantity } = useContext(PdvContext);

  const handleEditQuantity = (productId: number, quantity: number) => {
    setSelectedProductId(productId);
    setQuantityProduct(quantity);
    onOpen();
  };

  return (
    <>
      <DefaultLayout>
        <div className="w-full h-[calc(106dvh-119px)] grid grid-cols-12 gap-4 overflow-y-hidden">
          <SellForm onEditQuantity={handleEditQuantity} />
          <div className="overflow-auto col-start-5 col-span-10">
            <ProductsTable />
          </div>
        </div>

        <EditProductQuantityModal
          isOpen={isOpen}
          productId={selectedProductId ?? 0}
          qt={quantityProduct ?? 1}
          onOpenChange={onClose}
          onSubmit={updateQuantity}
        />
      </DefaultLayout>
    </>
  );
}
