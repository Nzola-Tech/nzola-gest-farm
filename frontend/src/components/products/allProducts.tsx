import React, { useMemo } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { allProductsProps } from "@/types/products";
import { Button } from "@heroui/button";
import { Pagination } from "@heroui/pagination";
import { handleDelete } from "@/database";
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
            >
                <TableHeader>
                    <TableColumn>Id</TableColumn>
                    <TableColumn>Nome</TableColumn>
                    <TableColumn>Categoria</TableColumn>
                    <TableColumn>Fabricante</TableColumn>
                    <TableColumn>Preço de Venda</TableColumn>
                    <TableColumn>Preço de Custo</TableColumn>
                    <TableColumn>Data de Validade</TableColumn>
                    <TableColumn>Forma Farmacêutica</TableColumn>
                    <TableColumn>Descrição</TableColumn>
                    <TableColumn>Estoque</TableColumn>
                    <TableColumn>Validade</TableColumn>
                    <TableColumn>Alertas</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No rows to display."} items={items}>{
                    items.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.manufacturer}</TableCell>
                            <TableCell>{product.sale_price.toFixed(2)}</TableCell>
                            <TableCell>{product.cost_price.toFixed(2)}</TableCell>
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
                            <TableCell>{product.pharmaceutical_form || "N/A"}</TableCell>
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
                            <TableCell className="text-center">
                                {
                                    product.stock_quantity <= 10 ?
                                        <span className="text-red-600">Baixo Estoque</span> :
                                        <span className="text-green-600">Em Estoque</span>
                                }
                            </TableCell>
                            <TableCell className="flex gap-2">
                                <Button
                                    color="primary"
                                    onPress={() => {
                                        setSelectedProduct(product);
                                        setEditOpen(true);
                                    }}
                                >
                                    Editar
                                </Button>
                                <Button
                                    color="danger"
                                    onPress={() => handleDelete(product.id!,db, onProductChange)}
                                >
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                }</TableBody>
            </Table>
        </>
    );
};

export default AllProducts;