import { 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  ModalContent 
} from '@heroui/modal';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';

import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

export interface EditProductQuantityModalProps {
  productId: number;
  qt: number;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (productId: number, quantity: number) => void; 
}

export const EditProductQuantityModal = ({
  isOpen,
  onOpenChange,
  productId,
  qt,
  onSubmit,
}: EditProductQuantityModalProps) => {

  const [quantity, setQuantity] = useState<number>(qt);

  useEffect(() => {
    if (isOpen) {
      setQuantity(qt); 
    }
  }, [isOpen, qt]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuantity(value ? Number(value) : 0);
  };

  const handleSubmit = () => {
    onSubmit(productId, quantity);  
    onOpenChange(false);
  };

  return (
    <Form
      onSubmit={handleSubmit}
    >
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Adicionar Produto
              </ModalHeader>
              <ModalBody>
                <Input
                  endContent={<ShoppingCartIcon className="size-6" />}
                  type="number"
                  placeholder="Quantidade"
                  variant="faded"
                  required
                  min={1}
                  value={quantity !== undefined && quantity !== null ? String(quantity) : ''}
                  onChange={handleChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={handleSubmit}>
                  Adicionar
                </Button>
                <Button color="danger" variant="flat" onPress={() => onClose()}>
                  Cancelar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Form>
  );
};
