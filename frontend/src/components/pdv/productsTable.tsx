import { Input } from "@heroui/input";
import { Pagination } from "@heroui/pagination";
import {
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Selection,
} from "@heroui/table";
import React, { useContext, useMemo, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { PdvContext } from "@/context/pdv";
import { useDbStore } from "@/store/db-store";

export default function ProductsTable() {
  const { products } = useDbStore();

  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);
  const { selectedKeys, setSelectedKeys, cart, addToCart, removeFromCart } =
    useContext(PdvContext);

  const handleSelectionChange = (keys: Selection) => {
    // Remover do carrinho os produtos desselecionados
    if (selectedKeys !== "all" && keys !== "all") {
      const prevIds = new Set(Array.from(selectedKeys) as string[]);
      const newIds = new Set(Array.from(keys) as string[]);

      prevIds.forEach((id) => {
        if (!newIds.has(id)) {
          removeFromCart(Number(id));
        }
      });
    }

    setSelectedKeys(keys);

    // Adicionar ao carrinho os produtos recém-selecionados
    if (keys === "all") {
      // Adiciona todos os produtos filtrados/visíveis ao carrinho
      filteredProducts.forEach((prod) => {
        if (!cart.some((item) => item.id === prod.id)) {
          addToCart({ ...prod, id: prod.id as number, quantity: 1 });
        }
      });
    } else if (keys instanceof Set) {
      const selectedIds = Array.from(keys) as string[];
      const selectedProducts = sortedItems.filter(
        (p) => p.id !== undefined && selectedIds.includes(String(p.id)),
      );

      selectedProducts.forEach((prod) => {
        if (!cart.some((item) => item.id === prod.id)) {
          addToCart({ ...prod, id: prod.id as number, quantity: 1 });
        }
      });
    }

    // Se desselecionar tudo, limpar o carrinho
    if (keys instanceof Set && keys.size === 0) {
      cart.forEach((item) => removeFromCart(item.id));
    }
  };

  // Filtro por nome
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const expDate = new Date(p.expiration_date);
        const now = new Date();
        const diffTime = expDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const isDeleted = p.deleted === 1;
        const isOutOfStock = p.stock_quantity <= 0;
        const isExpired = diffDays <= 0;

        return !isDeleted && !isOutOfStock && !isExpired;
      })
      .filter((product) =>
        product.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
  }, [products, filterValue]);

  // Paginação
  const pages = Math.ceil(filteredProducts.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredProducts.slice(start, end);
  }, [page, filteredProducts, rowsPerPage]);

  // Ordenação
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof typeof a];
      const second = b[sortDescriptor.column as keyof typeof b];

      if (typeof first === "number" && typeof second === "number") {
        return sortDescriptor.direction === "descending"
          ? second - first
          : first - second;
      }
      if (typeof first === "string" && typeof second === "string") {
        return sortDescriptor.direction === "descending"
          ? second.localeCompare(first)
          : first.localeCompare(second);
      }

      return 0;
    });
  }, [sortDescriptor, items]);

  // Estilo da tabela
  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        "group-data-[first=true]/tr:first:before:rounded-none",
        "group-data-[first=true]/tr:last:before:rounded-none",
        "group-data-[middle=true]/tr:before:rounded-none",
        "group-data-[last=true]/tr:first:before:rounded-none",
        "group-data-[last=true]/tr:last:before:rounded-none",
      ],
    }),
    [],
  );

  // Topo da tabela (busca e paginação)
  const topContent = (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          classNames={{
            base: "w-full sm:max-w-[44%]",
            inputWrapper: "border-1",
          }}
          placeholder="Buscar por nome..."
          size="md"
          startContent={<MagnifyingGlassIcon className="size-5" />}
          value={filterValue}
          variant="bordered"
          onClear={() => setFilterValue("")}
          onValueChange={setFilterValue}
        />
        <div className="flex gap-3">
          <label className="flex items-center text-default-400 text-small">
            Linhas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value="5">5</option>
              <option value="8">8</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {filteredProducts.length} produtos
        </span>
      </div>
    </div>
  );

  // Rodapé da tabela (paginação)
  const bottomContent = (
    <div className="py-2 px-2 flex justify-between items-center">
      <Pagination
        showControls
        classNames={{
          cursor: "bg-foreground text-background",
        }}
        color="default"
        page={page}
        total={pages}
        variant="light"
        onChange={setPage}
      />
      <span className="text-small text-default-400">
        {selectedKeys === "all"
          ? "Todos selecionados"
          : `${selectedKeys.size} de ${items.length} selecionados`}
      </span>
    </div>
  );

  return (
    <Table
      removeWrapper
      aria-label="Tabela de produtos"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={classNames}
      color="primary"
      disabledKeys={products
        .filter((p) => {
          const expDate = new Date(p.expiration_date);
          const now = new Date();
          const diffTime = expDate.getTime() - now.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          return (
            p.stock_quantity <= 0 ||
            (diffDays <= 0 && diffDays >= 0) ||
            p.deleted === 1
          );
        })
        .map((p) => String(p.id))}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={handleSelectionChange}
      onSortChange={setSortDescriptor}
    >
      <TableHeader>
        <TableColumn key="name" allowsSorting>
          Nome
        </TableColumn>
        <TableColumn key="sale_price" allowsSorting>
          Preço de Venda
        </TableColumn>
        <TableColumn key="expiration_date" allowsSorting>
          Data de Validade
        </TableColumn>
        <TableColumn key="stock_quantity" allowsSorting>
          Estoque
        </TableColumn>
      </TableHeader>
      <TableBody
        emptyContent={"Nenhum produto encontrado."}
        items={sortedItems}
      >
        {(product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.sale_price?.toFixed(2)}</TableCell>
            <TableCell>
              {(() => {
                const expDate = new Date(product.expiration_date);
                const now = new Date();
                const diffTime = expDate.getTime() - now.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (product.stock_quantity <= 0) {
                  // Sempre desabilitado, independente do prazo
                  return (
                    <span className="text-default-400">
                      {expDate.toLocaleDateString()}
                    </span>
                  );
                }
                if (diffDays <= 30 && diffDays > 0) {
                  return (
                    <span className="text-red-600">
                      {diffDays} dias restantes
                    </span>
                  );
                }

                return (
                  <span className="text-green-600">
                    {expDate.toLocaleDateString()}
                  </span>
                );
              })()}
            </TableCell>
            <TableCell>
              {product.stock_quantity <= 10 ? (
                <span className="text-red-600">{product.stock_quantity}</span>
              ) : (
                <span className="text-green-600">{product.stock_quantity}</span>
              )}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
