import React, { useMemo } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@heroui/table";
import { allProductsProps } from "@/types/products";
import { Button } from "@heroui/button";
import { Pagination } from "@heroui/pagination";

const AllProducts: React.FC<allProductsProps> = ({
    products,
    setEditOpen,
    setSelectedProduct,
    db,
    onProductChange
}) => {

    const [page, setPage] = React.useState(1);
    const rowsPerPage = 9;
    const pages = Math.ceil(products.length / rowsPerPage);
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return products.slice(start, end);
    }, [page, products])
    const handleDelete = async (id: number) => {
        if (!db) return;
        await db.execute("DELETE FROM products WHERE id = $1", [id]);
        if (onProductChange) onProductChange();
    };


    return (
        <>
            <Table
                aria-label="Example empty table"
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
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No rows to display."} items={items}>{
                    items.map((product) => (
                        <TableRow key={getKeyValue(product, "id")}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.manufacturer}</TableCell>
                            <TableCell>{product.sale_price}</TableCell>
                            <TableCell>{product.cost_price}</TableCell>
                            <TableCell>{product.expiration_date}</TableCell>
                            <TableCell>{product.pharmaceutical_form}</TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell>
                                <Button
                                    variant="solid"
                                    onPress={() => {
                                        setEditOpen(true);
                                        setSelectedProduct(product);
                                    }}
                                >Edit</Button>
                                <Button
                                    className="ml-2"
                                    variant="solid"
                                    color="danger"
                                    onPress={() => {
                                        product.id !== undefined && handleDelete(product.id)
                                    }}
                                >Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))
                }</TableBody>
            </Table>
        </>
    );
};

export default AllProducts;