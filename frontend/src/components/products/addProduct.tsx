import React from "react";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Switch } from "@heroui/switch";
import { Form } from "@heroui/form";
import { Produto } from "@/types/products";
import { AddProductProps } from "@/types/products";




const AddProduct: React.FC<AddProductProps> = ({ product, setProduct }) => {

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSwitch = (name: keyof Produto, checked: boolean) => {
    setProduct((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(product);
  };

  return (
    <div className="">
      <Form
        onSubmit={handleSubmit}
        className="w-full h-full bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-10 grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div>
          <label htmlFor="nome" className="font-semibold block mb-1">Nome:</label>
          <Input
            id="nome"
            name="nome"
            value={product.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="descricao" className="font-semibold block mb-1">Descrição:</label>
          <Textarea
            id="descricao"
            name="descricao"
            value={product.descricao}
            onChange={handleChange}
            required
            className="min-h-[80px]"
          />
        </div>
        <div>
          <label htmlFor="fabricante" className="font-semibold block mb-1">Fabricante:</label>
          <Input
            id="fabricante"
            name="fabricante"
            value={product.fabricante}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="registroAnvisa" className="font-semibold block mb-1">Registro Anvisa:</label>
          <Input
            id="registroAnvisa"
            name="registroAnvisa"
            value={product.registroAnvisa}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lote" className="font-semibold block mb-1">Lote:</label>
          <Input
            id="lote"
            name="lote"
            value={product.lote}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="dataValidade" className="font-semibold block mb-1">Data de Validade:</label>
          <Input
            id="dataValidade"
            type="date"
            name="dataValidade"
            value={product.dataValidade}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="quantidadeEstoque" className="font-semibold block mb-1">Quantidade em Estoque:</label>
          <Input
            id="quantidadeEstoque"
            type="number"
            name="quantidadeEstoque"
            value={product.quantidadeEstoque.toString()}
            onChange={handleChange}
            min={0}
            required
          />
        </div>
        <div>
          <label htmlFor="precoVenda" className="font-semibold block mb-1">Preço de Venda (R$):</label>
          <Input
            id="precoVenda"
            type="number"
            name="precoVenda"
            value={product.precoVenda.toString()}
            onChange={handleChange}
            step="0.01"
            min={0}
            required
          />
        </div>
        <div>
          <label htmlFor="precoCusto" className="font-semibold block mb-1">Preço de Custo (R$):</label>
          <Input
            id="precoCusto"
            type="number"
            name="precoCusto"
            value={product.precoCusto.toString()}
            onChange={handleChange}
            step="0.01"
            min={0}
            required
          />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="controlado" className="font-semibold">Controlado</label>
          <Switch
            id="controlado"
            checked={product.controlado}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSwitch("controlado", e.target.checked)}
          />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="prescricaoObrigatoria" className="font-semibold">Prescrição Obrigatória</label>
          <Switch
            id="prescricaoObrigatoria"
            checked={product.prescricaoObrigatoria}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSwitch("prescricaoObrigatoria", e.target.checked)}
          />
        </div>
        <div>
          <label htmlFor="categoria" className="font-semibold block mb-1">Categoria:</label>
          <Input
            id="categoria"
            name="categoria"
            value={product.categoria}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="formaFarmaceutica" className="font-semibold block mb-1">Forma Farmacêutica:</label>
          <Input
            id="formaFarmaceutica"
            name="formaFarmaceutica"
            value={product.formaFarmaceutica}
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