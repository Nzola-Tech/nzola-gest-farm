import AddProduct from "@/components/products/addProduct";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { initialState, Product } from "@/types/products";
import { useContext, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure
} from "@heroui/modal";
import EditProduct from "@/components/products/editProduct";
import AllProducts from "@/components/products/allProducts";
import InventoryModal from "@/components/products/inventoryModal";
import { fetchProducts } from "@/database/products";
import { DbContext } from "@/context/db";

export default function Produtos() {
  const [product, setProduct] = useState<Product>(initialState);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {db,products,refreshProducts} = useContext(DbContext)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);

  return (
    <>
      <DefaultLayout>
        <div className="flex flex-row-reverse gap-4">
          <Button variant="solid" color="primary" onPress={onOpen}>Adicionar Produto</Button>
          <Button color="primary" onPress={() => setInventoryOpen(true)}>
            Inventário Diário
          </Button>
        </div>

        <AllProducts
          products={products}
          setEditOpen={setEditOpen}
          setSelectedProduct={setSelectedProduct}
          db={db}
          onProductChange={refreshProducts}
          onOpenInventory={() => setInventoryOpen(true)}
        />
        <InventoryModal
          open={inventoryOpen}
          onClose={() => setInventoryOpen(false)}
          products={products}
        />
        <Modal isOpen={isOpen} size="5xl" backdrop="blur" onOpenChange={onOpenChange} scrollBehavior="inside">
          <ModalContent>
            {
              () => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-3xl">Adiconar Produto</ModalHeader>
                  <ModalBody>
                    <AddProduct
                      product={product}
                      setProduct={setProduct}
                      db={db}
                      onProductChange={refreshProducts}
                      onClose={onOpenChange}
                    />
                  </ModalBody>
                </>
              )
            }
          </ModalContent>
        </Modal>
        <Modal isOpen={editOpen} size="5xl" backdrop="blur" onOpenChange={setEditOpen} scrollBehavior="inside">
          <ModalContent>
            {
              () => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-3xl">Editar Produto</ModalHeader>
                  <ModalBody>
                    {selectedProduct && (
                      <EditProduct
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
                        db={db}
                        onProductChange={refreshProducts}
                        onClose={() => setEditOpen(false)}
                      />
                    )}
                  </ModalBody>
                </>
              )
            }
          </ModalContent>
        </Modal>
      </DefaultLayout>
    </>
  );
}
