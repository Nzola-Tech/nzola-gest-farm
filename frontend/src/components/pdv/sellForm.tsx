import { PdvContext } from "@/context/pdv"
import { paymentOptions } from "@/types/pdv"
import { ShoppingCartIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { ButtonGroup, Button } from "@heroui/button"
import { ScrollShadow } from "@heroui/scroll-shadow"
import { Select, SelectItem } from "@heroui/select"
import { useContext } from "react"
import { Form } from "@heroui/form"
import { DbContext } from "@/context/db"
import { NumberInput } from "@heroui/number-input";
export const SellForm = () => {
  const { cart, removeFromCart, payment, updateQuantity } = useContext(PdvContext)
  const total = cart.reduce(
    (sum, item) => sum + item.sale_price * item.quantity, 0);
  const { db, refreshProducts } = useContext(DbContext)
  const { setCart } = useContext(PdvContext)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!db || cart.length === 0) return;

    // 1. Cria a venda
    const now = new Date().toISOString();
    await db.execute(
      "INSERT INTO sales (total, payment_method, created_at) VALUES ($1, $2, $3)",
      [total, payment, now]
    );
    // 2. Pega o id da venda recém criada
    const [{ id: saleId }] = (await db.select("SELECT last_insert_rowid() as id")) as { id: number }[];

    // 3. Cria os itens da venda e atualiza estoque
    for (const item of cart) {
      await db.execute(
        "INSERT INTO sale_items (sale_id, product_id, quantity, price, created_at) VALUES ($1, $2, $3, $4, $5)",
        [saleId, item.id, item.quantity, item.sale_price, now]
      );
      await db.execute(
        "UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2",
        [item.quantity, item.id]
      );
    }

    // 4. Limpa o carrinho e atualiza produtos
    setCart([]);
    refreshProducts && refreshProducts();
    e.currentTarget.reset()
  };
  return (
    <Form
      onSubmit={handleSubmit}
      className="overflow-auto col-span-4"
    >

      <div className="w-full grid grid-row-8 h-full">
        <div className="relative bg-slate-100 dark:bg-zinc-800 dark:text-white p-4 rounded-t-3xl">
          <div>
            <h1 className="font-bold text-lg">Nzola Gest Farmacia</h1>
            <p>Factura</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Total a pagar</p>
            <h2 className="text-right text-3xl font-semibold text-green-400">{total.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}KZ</h2>
          </div>
        </div>

        <ScrollShadow className="row-span-6 p-4 space-y-4 h-full">
          {cart.length === 0 ? (
            <div className="h-full w-full flex justify-center items-center gap-2">
              <p>Sem itens adicionados ao carrinho.</p>
              <ShoppingCartIcon className="size-6" />

            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name}</span>
                <span>{item.sale_price} KZ</span>
                <span>{item.quantity}</span>
                <Button
                  type="button"
                  onPress={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remover
                </Button>
                <Button
                  type="button"
                  onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Adicionar
                </Button>
                <Button
                  type="button"
                  onPress={() => updateQuantity(item.id, item.quantity - 1)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Remover
                </Button>
              </div>
            ))
          )}
        </ScrollShadow>

        <div className="flex flex-col items-end justify-end gap-2 bg-slate-100 p-4 dark:bg-zinc-800">
          <NumberInput
            label="PAGAMENTO"
            placeholder="0.00"
            variant="underlined"
            required
            errorMessage="Preencha este campo"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
          />
          <Select
            label="Modo de pagamento"
            name="paymentMode"
            variant="underlined"
            size="md"
            placeholder="Selecione um metodo"
            className="w-[217.5px]"
            required
          >
            {paymentOptions.map((pay) => (
              <SelectItem key={pay.value}>
                {pay.label}
              </SelectItem>
            ))}
          </Select>
          <ButtonGroup size="md">
            <Button
              type="submit"
              color="success"
              className="text-white"
              endContent={<CheckIcon className="size-5" />}
            >
              Facturar
            </Button>
            <Button
              type="reset"
              className="bg-red-600 text-white"
              endContent={<XMarkIcon className="size-5" />}
            >
              Cancela
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </Form>
  )
}