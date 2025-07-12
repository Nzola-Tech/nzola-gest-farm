import React from "react";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { initialState, Product } from "@/types/products";
import { AddProductProps } from "@/types/products";




const AddProduct: React.FC<AddProductProps> = ({
  product,
  setProduct,
  db,
  onProductChange,
  onClose
}) => {

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
    const formData = Object.fromEntries(new FormData(e.target as HTMLFormElement));
    const product: Product = {
      id: undefined, // Assuming ID is auto-generated
      name: formData.name as string,
      description: formData.description as string,
      expiration_date: formData.expiration_date as string,
      stock_quantity: Number(formData.stock_quantity),
      sale_price: Number(formData.sale_price),
      category: formData.category as string,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted: 0
    }
    await db.execute(
      `INSERT INTO products (name, description, expiration_date, stock_quantity, sale_price, category, created_at, updated_at, deleted) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        product.name,
        product.description,
        product.expiration_date,
        product.stock_quantity,
        product.sale_price,
        product.category,
        product.created_at,
        product.updated_at,
        product.deleted
      ]
    );
    setProduct(initialState);
    if (onProductChange) onProductChange();
    if (onClose) onClose();

  };

  return (
    <div className="">
      <Form
        onSubmit={handleSubmit}
        className="w-full h-full bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-10 grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div>
          <label htmlFor="name" className="font-semibold block mb-1">Nome:</label>
          <Input
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            errorMessage="O nome do produto é obrigatório."
          />
        </div>
        <div>
          <label htmlFor="description" className="font-semibold block mb-1">Descrição:</label>
          <Textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="min-h-[80px]"
          />
        </div>
        <div>
          <label htmlFor="expiration_date" className="font-semibold block mb-1">Data de Validade:</label>
          <Input
            id="expiration_date"
            type="date"
            name="expiration_date"
            value={product.expiration_date}
            onChange={handleChange}
            required
            errorMessage="A data de validade é obrigatória."
          />
        </div>
        <div>
          <label htmlFor="stock_quantity" className="font-semibold block mb-1">Quantidade em Estoque:</label>
          <Input
            id="stock_quantity"
            type="number"
            name="stock_quantity"
            value={product.stock_quantity.toString()}
            onChange={handleChange}
            required
            min={1}
            errorMessage="A quantidade em estoque é obrigatória."
          />
        </div>
        <div>
          <label htmlFor="sale_price" className="font-semibold block mb-1">Preço de Venda (KZ):</label>
          <Input
            id="sale_price"
            type="number"
            name="sale_price"
            value={product.sale_price.toString()}
            onChange={handleChange}
            step="0.01"
            min={1}
            required
            errorMessage="O preço de venda é obrigatório."
          />
        </div>
        <div>
          <label htmlFor="category" className="font-semibold block mb-1">Categoria:</label>
          <Input
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
          />
        </div>
        <div className="md:col-span-2 flex justify-center mt-8">
          <Button type="submit" variant="shadow" color="success" size="lg" className="w-1/2 text-lg font-bold text-white ">
            Cadastrar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddProduct;