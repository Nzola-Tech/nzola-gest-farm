import { Button } from "@heroui/button";
import { useContext, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/modal";

import AddProduct from "@/components/products/addProduct";
import DefaultLayout from "@/layouts/default";
import { initialState, Product } from "@/types/products";
import EditProduct from "@/components/products/editProduct";
import AllProducts from "@/components/products/allProducts";
import InventoryModal from "@/components/products/inventoryModal";
import { DbContext } from "@/context/db";
import { SearchInput } from "@/components/products/searchInput";

export default function Produtos() {
  const [product, setProduct] = useState<Product>(initialState);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { db, products, refreshProducts } = useContext(DbContext);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  return (
    <>
      <DefaultLayout>
        <div className="flex w-full justify-between">
          <SearchInput
            filterValue={filterValue}
            setFilterValue={setFilterValue}
          />
          <div className="flex flex-row-reverse gap-4">
            <Button color="primary" variant="solid" onPress={onOpen}>
              Adicionar Produto
            </Button>
            <Button color="primary" onPress={() => setInventoryOpen(true)}>
              Inventário Diário
            </Button>
          </div>
        </div>

        <AllProducts
          db={db}
          filterValue={filterValue}
          products={products}
          setEditOpen={setEditOpen}
          setSelectedProduct={setSelectedProduct}
          onOpenInventory={() => setInventoryOpen(true)}
          onProductChange={refreshProducts}
        />
        <InventoryModal
          open={inventoryOpen}
          products={products}
          onClose={() => setInventoryOpen(false)}
        />
        <Modal
          backdrop="blur"
          isOpen={isOpen}
          scrollBehavior="inside"
          size="5xl"
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-3xl">
                  Adiconar Produto
                </ModalHeader>
                <ModalBody>
                  <AddProduct
                    db={db}
                    product={product}
                    setProduct={setProduct}
                    onClose={onOpenChange}
                    onProductChange={refreshProducts}
                  />
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
        <Modal
          backdrop="blur"
          isOpen={editOpen}
          scrollBehavior="inside"
          size="5xl"
          onOpenChange={setEditOpen}
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-3xl">
                  Editar Produto
                </ModalHeader>
                <ModalBody>
                  {selectedProduct && (
                    <EditProduct
                      db={db}
                      product={selectedProduct}
                      setProduct={(updatedProduct) => {
                        if (typeof updatedProduct === "function") {
                          setSelectedProduct((prev) => {
                            if (prev === null) return prev;

                            // @ts-ignore
                            return updatedProduct(prev);
                          });
                        } else if (updatedProduct !== null) {
                          setSelectedProduct(updatedProduct);
                        }
                      }}
                      onClose={() => setEditOpen(false)}
                      onProductChange={refreshProducts}
                    />
                  )}
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </DefaultLayout>
    </>
  );
}
