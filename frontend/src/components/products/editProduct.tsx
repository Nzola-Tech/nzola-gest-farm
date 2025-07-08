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
        name = $1, description = $2, manufacturer = $3, expiration_date = $4, 
        stock_quantity = $5, sale_price = $6, cost_price = $7, controlled = $8, 
        prescription_required = $9, category = $10, pharmaceutical_form = $11, updated_at = $12
        WHERE id = $13`,
            [
                product.name,
                product.description,
                product.expiration_date,
                product.stock_quantity,
                product.sale_price,
                product.cost_price,
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
                <label htmlFor="sale_price" className="font-semibold block mb-1">Preço de Venda (R$):</label>
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