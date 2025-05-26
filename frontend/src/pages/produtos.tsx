import AddProduct from "@/components/products/addProduct";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { Produto } from "@/types/products";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure
} from "@heroui/modal";

const initialState: Produto = {
  nome: "",
  descricao: "",
  fabricante: "",
  registroAnvisa: "",
  lote: "",
  dataValidade: "",
  quantidadeEstoque: 0,
  precoVenda: 0,
  precoCusto: 0,
  controlado: false,
  prescricaoObrigatoria: false,
  categoria: "",
  formaFarmaceutica: "",
};

export default function Produtos() {
  const [product, setProduct] = useState<Produto>(initialState);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <DefaultLayout>
        <Button variant="solid" color="primary" onPress={onOpen}>Adicionar Produto</Button>
        <Modal isOpen={isOpen} size="5xl" backdrop="blur" onOpenChange={onOpenChange} scrollBehavior="inside">
          <ModalContent>
            {
              () => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-3xl">Adiconar Produto</ModalHeader>
                  <ModalBody>
                    <AddProduct product={product} setProduct={setProduct} />
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
