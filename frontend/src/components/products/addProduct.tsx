import React from "react";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Switch } from "@heroui/switch";
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

  const handleSwitch = (name: keyof Product, checked: boolean) => {
    setProduct((prev) => ({
      ...prev,
      [name]: checked,
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
      manufacturer: formData.manufacturer as string,
      expiration_date: formData.expiration_date as string,
      stock_quantity: Number(formData.stock_quantity),
      sale_price: Number(formData.sale_price),
      cost_price: Number(formData.cost_price),
      controlled: formData.controlled === "on",
      prescription_required: formData.prescription_required === "on",
      category: formData.category as string,
      pharmaceutical_form: formData.pharmaceutical_form as string,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    await db.execute(
      `INSERT INTO products (name, description, manufacturer, expiration_date, stock_quantity, sale_price, cost_price, controlled, prescription_required, category, pharmaceutical_form, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
      [
        product.name,
        product.description,
        product.manufacturer,
        product.expiration_date,
        product.stock_quantity,
        product.sale_price,
        product.cost_price,
        product.controlled,
        product.prescription_required,
        product.category,
        product.pharmaceutical_form,
        product.created_at,
        product.updated_at,
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
          />
        </div>
        <div>
          <label htmlFor="description" className="font-semibold block mb-1">Descrição:</label>
          <Textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="min-h-[80px]"
          />
        </div>
        <div>
          <label htmlFor="manufacturer" className="font-semibold block mb-1">Fabricante:</label>
          <Input
            id="manufacturer"
            name="manufacturer"
            value={product.manufacturer}
            onChange={handleChange}
            required
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
            min={0}
            required
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
            min={0}
            required
          />
        </div>
        <div>
          <label htmlFor="cost_price" className="font-semibold block mb-1">Preço de Custo (KZ):</label>
          <Input
            id="cost_price"
            type="number"
            name="cost_price"
            value={product.cost_price.toString()}
            onChange={handleChange}
            step="0.01"
            min={0}
            required
          />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="controlled" className="font-semibold">Controlado</label>
          <Switch
            id="controlled"
            checked={product.controlled}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSwitch("controlled", e.target.checked)}
          />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="prescription_required" className="font-semibold">Prescrição Obrigatória</label>
          <Switch
            id="prescription_required"
            checked={product.prescription_required}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSwitch("prescription_required", e.target.checked)}
          />
        </div>
        <div>
          <label htmlFor="category" className="font-semibold block mb-1">Categoria:</label>
          <Input
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="pharmaceutical_form" className="font-semibold block mb-1">Forma Farmacêutica:</label>
          <Input
            id="pharmaceutical_form"
            name="pharmaceutical_form"
            value={product.pharmaceutical_form}
            onChange={handleChange}
            required
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