import React, { useMemo } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Selection } from "@heroui/table";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { allProductsProps } from "@/types/products";
import { Button } from "@heroui/button";
import { Pagination } from "@heroui/pagination";
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import { addToast } from "@heroui/toast";
const AllProducts: React.FC<allProductsProps & { filterValue: string }> = ({
    products,
    setEditOpen,
    setSelectedProduct,
    db,
    onProductChange,
    filterValue
}) => {

    const [page, setPage] = React.useState(1);
    const rowsPerPage = 9;
    const pages = Math.ceil(products.length / rowsPerPage);

    const filteredProducts = useMemo(() => {
        if (!filterValue) return products;
        return products.filter((product) =>
            product.name.toLowerCase().includes(filterValue.toLowerCase())
        );
    }, [products, filterValue]);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredProducts.slice(start, end);
    }, [page, filteredProducts])

    const tryDelete = async (id: number) => {
        if (!db) return;
        const sales = await db.select("SELECT 1 FROM sale_items WHERE product_id = $1 LIMIT 1", [id]) as any[];
        if (sales.length > 0) {
            addToast({
                title: "Não é possível excluir",
                description: "Este produto já foi vendido e não pode ser excluído. Você pode desativá-lo.",
                color: "danger",
                timeout: 12000,
                shouldShowTimeoutProgress: true,
            });
            return;
        }
        await db.execute("DELETE FROM products WHERE id = $1", [id]);
        if (onProductChange) onProductChange();
    };

    const deactivateProduct = async (id: number) => {
        if (!db) return;
        await db.execute("UPDATE products SET deleted = 1 WHERE id = $1", [id]);
        addToast({
            title: "Produto desativado",
            description: "O produto foi desativado com sucesso.",
            color: "warning",
            timeout: 12000,
            shouldShowTimeoutProgress: true,
        });
        if (onProductChange) onProductChange();
    };

    const activateProduct = async (id: number) => {
        if (!db) return;
        await db.execute("UPDATE products SET deleted = 0 WHERE id = $1", [id]);
        addToast({
            title: "Produto ativado",
            description: "O produto foi ativado com sucesso.",
            color: "success",
            timeout: 12000,
            shouldShowTimeoutProgress: true,
        });
        if (onProductChange) onProductChange();
    };

    //Todo produto que tiver a propriedade deleted com 1 deve ser marcado como uma linha desativada


    return (
        <>
            <Table
                aria-label="Nenhum produto encontrado"
                color="primary"
                className="mt-4"
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="secondary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
                disabledKeys={products
                    .filter(p => p.deleted && p.id !== undefined)
                    .map(p => p.id!.toString())}
            >
                <TableHeader>
                    <TableColumn>Id</TableColumn>
                    <TableColumn>Nome</TableColumn>
                    <TableColumn>Categoria</TableColumn>
                    <TableColumn>Preço de Venda</TableColumn>
                    <TableColumn>Data de Validade</TableColumn>
                    <TableColumn>Descrição</TableColumn>
                    <TableColumn>Estoque</TableColumn>
                    <TableColumn>Validade</TableColumn>
                    <TableColumn>Estado</TableColumn>
                    <TableColumn>Alertas</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No rows to display."} items={items}>{
                    items.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.sale_price.toFixed(2)}</TableCell>
                            <TableCell>
                                {(() => {
                                    const expDate = new Date(product.expiration_date);
                                    const now = new Date();
                                    const diffTime = expDate.getTime() - now.getTime();
                                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                    if (diffDays <= 30 && diffDays > 0) {
                                        return (
                                            <span className="text-red-600">{diffDays} dias restantes</span>
                                        );
                                    }
                                    return <span className="text-green-600">{expDate.toLocaleDateString()}</span>;
                                })()}
                            </TableCell>

                            <TableCell>
                                {product.description && product.description.length > 15
                                    ? product.description.slice(0, 15) + "..."
                                    : product.description}
                            </TableCell>

                            <TableCell>
                                {
                                    product.stock_quantity <= 10 ?
                                        <span className="text-red-600">{product.stock_quantity}</span> :
                                        <span className="text-green-600">{product.stock_quantity}</span>
                                }
                            </TableCell>
                            <TableCell>{new Date(product.created_at).toLocaleDateString()}</TableCell>
                            <TableCell>{
                                product.deleted ?
                                    <span className="text-red-600">Desativado</span>
                                    :
                                    <span className="text-green-600">Ativo</span>
                            }</TableCell>
                            <TableCell className="text-center">
                                {
                                    product.stock_quantity <= 10 ?
                                        <span className="text-red-600 block">Baixo Estoque</span> :
                                        <span className="text-green-600">Em Estoque</span>
                                }
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-center">
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button isIconOnly size="sm" variant="light">
                                                <EllipsisVerticalIcon className="text-default-600 " />
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu>
                                            <DropdownItem
                                                key="edit"
                                                onClick={() => {
                                                    setSelectedProduct(product);
                                                    setEditOpen(true);
                                                }}
                                            >
                                                Editar
                                            </DropdownItem>
                                            <DropdownItem
                                                key="delete"
                                                className="text-danger"
                                                color="danger"
                                                onClick={async () => {
                                                    await tryDelete(product.id!);
                                                }}
                                            >
                                                Excluir
                                            </DropdownItem>
                                            <DropdownItem
                                                key="deactivate"
                                                className="text-warning"
                                                color="warning"
                                                onClick={async () => {
                                                    await deactivateProduct(product.id!);
                                                }}
                                            >
                                                Desativar
                                            </DropdownItem>
                                            <DropdownItem
                                                key="activate"
                                                className="text-success"
                                                color="warning"
                                                onClick={async () => {
                                                    await activateProduct(product.id!);
                                                }}
                                            >
                                                Activar
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                }</TableBody>
            </Table>
        </>
    );
};

export default AllProducts;