import React, { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import Select, { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger }  from "@heroui/dropdown";
import { Product } from "@/types/products";

type PDVProps = {
  products: Product[];
  db: any;
  onSaleComplete: () => void;
};

type CartItem = Product & { quantity: number };

const paymentOptions = [
  { label: "Dinheiro", value: "dinheiro" },
  { label: "Cartão", value: "cartao" },
  { label: "Convênio", value: "convenio" },
];

const PDV: React.FC<PDVProps> = ({ products, db, onSaleComplete }) => {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [payment, setPayment] = useState(paymentOptions[0].value);

  // Busca produto por nome ou código de barras
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    // Se for código de barras (ex: só números e tamanho >= 6), adiciona direto
    if (/^\d{6,}$/.test(e.target.value)) {
      const found = products.find(p => p.barcode === e.target.value);
      if (found) {
        addToCart(found);
        setSearch("");
      }
    }
  };

  // Adiciona produto ao carrinho
  const addToCart = (product: Product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Remove item do carrinho
  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Atualiza quantidade
  const updateQuantity = (id: number, quantity: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Total da venda
  const total = cart.reduce(
    (sum, item) => sum + item.sale_price * item.quantity,
    0
  );

  // Finaliza a venda
  const handleFinish = async () => {
    if (!db || cart.length === 0) return;
    // Salva a venda (exemplo simples)
    await db.execute(
      "INSERT INTO sales (total, payment_method, created_at) VALUES ($1, $2, $3)",
      [total, payment, new Date().toISOString()]
    );
    // Atualiza estoque e salva itens vendidos
    for (const item of cart) {
      await db.execute(
        "UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2",
        [item.quantity, item.id]
      );
      await db.execute(
        "INSERT INTO sale_items (product_id, quantity, price, created_at) VALUES ($1, $2, $3, $4)",
        [item.id, item.quantity, item.sale_price, new Date().toISOString()]
      );
    }
    setCart([]);
    setSearch("");
    onSaleComplete();
    alert("Venda realizada com sucesso!");
  };

  // Produtos filtrados para busca manual
  const filteredProducts = products.filter(
    p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.barcode && p.barcode.includes(search))
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded shadow space-y-4">
      <h2 className="text-2xl font-bold mb-4">PDV - Vendas no Balcão</h2>
      <div className="flex gap-4">
        <Input
          autoFocus
          placeholder="Escaneie o código de barras ou digite o nome"
          value={search}
          onChange={handleSearch}
          className="flex-1"
        />
        <Button
          color="primary"
          onPress={() => {
            const found = filteredProducts[0];
            if (found) addToCart(found);
            setSearch("");
          }}
        >
          Adicionar
        </Button>
      </div>
      {search && (
        <div className="bg-gray-100 dark:bg-zinc-800 rounded p-2">
          <span className="font-semibold">Resultados:</span>
          <ul>
            {filteredProducts.slice(0, 5).map(p => (
              <li key={p.id}>
                <Button
                  size="sm"
                  variant="light"
                  onPress={() => {
                    addToCart(p);
                    setSearch("");
                  }}
                >
                  {p.name} ({p.barcode || "sem código"})
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <h3 className="font-bold mb-2">Carrinho</h3>
        <table className="min-w-full border mb-2">
          <thead>
            <tr>
              <th className="p-2 border">Produto</th>
              <th className="p-2 border">Qtd</th>
              <th className="p-2 border">Preço</th>
              <th className="p-2 border">Subtotal</th>
              <th className="p-2 border"></th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id}>
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">
                  <Input
                    type="number"
                    min={1}
                    value={item.quantity.toString()}
                    onChange={e =>
                      updateQuantity(item.id!, Number(e.target.value))
                    }
                    className="w-16"
                  />
                </td>
                <td className="p-2 border">R$ {item.sale_price.toFixed(2)}</td>
                <td className="p-2 border">
                  R$ {(item.sale_price * item.quantity).toFixed(2)}
                </td>
                <td className="p-2 border">
                  <Button
                    color="danger"
                    size="sm"
                    onPress={() => removeFromCart(item.id!)}
                  >
                    Remover
                  </Button>
                </td>
              </tr>
            ))}
            {cart.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-2">
                  Nenhum produto no carrinho.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <div>
            <label className="font-semibold mr-2">Forma de Pagamento:</label>
            <Dropdown>
                <DropdownTrigger>
                    <Button variant="bordered">Seleciona o pageamento</Button>
                </DropdownTrigger>
                <DropdownMenu>
                    {paymentOptions.map(opt => (
                        <DropdownItem key={opt.value} onClick={() => setPayment(opt.value)}>
                            {opt.label}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
          </div>
          <div className="text-xl font-bold">
            Total: R$ {total.toFixed(2)}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button
            color="success"
            size="lg"
            onPress={handleFinish}
            disabled={cart.length === 0}
          >
            Finalizar Venda
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PDV;