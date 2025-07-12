import React from "react";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { EditProductProps } from "@/types/products";



const EditProduct: React.FC<EditProductProps> = ({ product, setProduct, db, onClose, onProductChange }) => {
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
            ]
        );
        if (onProductChange) onProductChange();
        onClose();
    };

    return (
        <Form
            onSubmit={handleSubmit}
            className="w-full bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-10 grid grid-cols-1 md:grid-cols-2 gap-8"
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
                <label htmlFor="sale_price" className="font-semibold block mb-1">Preço de Venda (R$):</label>
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
                    required
                />
            </div>
            <div className="md:col-span-2 flex justify-center mt-8">
                <Button type="submit" variant="shadow" color="primary" size="lg" className="w-1/2 text-lg font-bold text-white ">
                    Salvar Alterações
                </Button>
            </div>
        </Form>
    );
};

export default EditProduct;