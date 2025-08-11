import { EditProductQuantityModal } from "@/components/pdv/editProductQuantityModal";
import ProductsTable from "@/components/pdv/productsTable";
import { SellForm } from "@/components/pdv/sellForm";
import DefaultLayout from "@/layouts/default";
import { usePdvStore } from "@/store/pdv-store";
import { useDisclosure } from "@heroui/modal";
import { useState } from "react";

export default function Pdv() {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [quantityProduct, setQuantityProduct] = useState<number | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { updateQuantity } = usePdvStore();

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
          productId={selectedProductId ?? 0}
          isOpen={isOpen}
          onOpenChange={onClose}
          onSubmit={updateQuantity}
          qt={quantityProduct ?? 1}
        />

      </DefaultLayout>
    </>
  );
}
