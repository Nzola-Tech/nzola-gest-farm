import AddProduct from "@/components/products/addProduct";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { initialState, Product } from "@/types/products";
import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure
} from "@heroui/modal";
import Database from '@tauri-apps/plugin-sql';
import EditProduct from "@/components/products/editProduct";
import AllProducts from "@/components/products/allProducts";
import InventoryModal from "@/components/products/inventoryModal";

export default function Produtos() {
  const [product, setProduct] = useState<Product>(initialState);
  const [products, setProducts] = useState<Product[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [db, setDb] = useState<Database | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const fetchProducts = async (database: Database) => {
    const result = await database.select("SELECT * FROM products");
    setProducts(result as Product[]);
  };
  const [inventoryOpen, setInventoryOpen] = useState(false);

  useEffect(() => {
    const initDb = async () => {
      const database = await Database.load("sqlite:ngf.db")
      setDb(database)
      setProduct(initialState);
      fetchProducts(database);
    }
    initDb()
  }, []);
  return (
    <>
      <DefaultLayout>
        <div className="flex flex-row gap-4">
          <Button variant="solid" color="primary" onPress={onOpen}>Adicionar Produto</Button>
          <Button variant="solid" color="primary" onPress={() => { setEditOpen(true); setSelectedProduct(product); }}>Editar Produto</Button>

          <Button color="primary" onPress={() => setInventoryOpen(true)}>
            Inventário Diário
          </Button>
        </div>

        <AllProducts
          products={products}
          setEditOpen={setEditOpen}
          setSelectedProduct={setSelectedProduct}
          db={db}
          onProductChange={() => db && fetchProducts(db)}
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
                      onProductChange={() =>
                        db && fetchProducts(db)
                      }
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
                          // Only update if updatedProduct is not null
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
                        onProductChange={() => db && fetchProducts(db)}
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
