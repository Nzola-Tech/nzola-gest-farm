import React from "react";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";

import { EditProductProps } from "@/types/products";

const EditProduct: React.FC<EditProductProps> = ({
  product,
  setProduct,
  db,
  onClose,
  onProductChange,
}) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;
    await db.execute(
      `UPDATE products SET 
        name = $1, description = $2, expiration_date = $3, 
        stock_quantity = $4, sale_price = $5, 
        category = $6, updated_at = $7
        WHERE id = $8`,
      [
        product.name,
        product.description,
        product.expiration_date,
        product.stock_quantity,
        product.sale_price,
        product.category,
        new Date().toISOString(),
        product.id,
      ],
    );
    if (onProductChange) onProductChange();
    onClose();
  };

  return (
    <Form
      className="w-full bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-10 grid grid-cols-1 md:grid-cols-2 gap-8"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="font-semibold block mb-1" htmlFor="name">
          Nome:
        </label>
        <Input
          required
          errorMessage="O nome do produto é obrigatório."
          id="name"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="font-semibold block mb-1" htmlFor="description">
          Descrição:
        </label>
        <Textarea
          className="min-h-[80px]"
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="font-semibold block mb-1" htmlFor="expiration_date">
          Data de Validade:
        </label>
        <Input
          required
          errorMessage="A data de validade é obrigatória."
          id="expiration_date"
          name="expiration_date"
          type="date"
          value={product.expiration_date}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="font-semibold block mb-1" htmlFor="stock_quantity">
          Quantidade em Estoque:
        </label>
        <Input
          required
          errorMessage="A quantidade em estoque é obrigatória."
          id="stock_quantity"
          min={1}
          name="stock_quantity"
          type="number"
          value={product.stock_quantity.toString()}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="font-semibold block mb-1" htmlFor="sale_price">
          Preço de Venda (R$):
        </label>
        <Input
          required
          errorMessage="O preço de venda é obrigatório."
          id="sale_price"
          min={1}
          name="sale_price"
          step="0.01"
          type="number"
          value={product.sale_price.toString()}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="font-semibold block mb-1" htmlFor="category">
          Categoria:
        </label>
        <Input
          required
          id="category"
          name="category"
          value={product.category}
          onChange={handleChange}
        />
      </div>
      <div className="md:col-span-2 flex justify-center mt-8">
        <Button
          className="w-1/2 text-lg font-bold text-white "
          color="primary"
          size="lg"
          type="submit"
          variant="shadow"
        >
          Salvar Alterações
        </Button>
      </div>
    </Form>
  );
};

export default EditProduct;
