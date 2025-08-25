import { useDbStore } from "@/store/db-store";
import { BanknotesIcon, ShoppingBagIcon, ShoppingCartIcon, ShieldExclamationIcon } from "@heroicons/react/24/outline";

export default function SaleInfo() {
    const { products } = useDbStore();
    const allProducts = products.filter(product => product.deleted === 0 && product.stock_quantity > 0 && product.expiration_date !== new Date().toISOString().split('T')[0]);
    const unavailableProducts = products.filter(product => product.deleted === 1 || product.stock_quantity === 0 || product.expiration_date === new Date().toISOString().split('T')[0]);
    return (
        <div className="w-full grid grid-rows-1 grid-cols-4 gap-4 py-4">
            <div className="group flex items-center gap-4 p-2 bg-white dark:bg-default-100 rounded-lg shadow-md hover:bg-success-500 dark:hover:bg-success-500 transition-colors">
                <BanknotesIcon className="size-16 text-success-500 group-hover:text-white" />
                <div>
                    <h3 className="text-lg font-semibold group-hover:text-white">Vendas</h3>
                    <span className="group-hover:text-white">
                        {new Date().toLocaleDateString("pt-BR").replace(/\//g, "-")}
                    </span>
                    <p className="text-2xl font-bold text-success-500 group-hover:text-white">
                        $ 1.000,00
                    </p>
                </div>
            </div>

            <div className="group flex items-center gap-4 p-4 bg-white dark:bg-default-100 rounded-lg shadow-md hover:bg-success-500 dark:hover:bg-success-500 transition-colors">
                <ShoppingBagIcon className="size-16 text-success-500 group-hover:text-white" />
                <div>
                    <h3 className="text-lg font-semibold group-hover:text-white">Produtos Vendidos</h3>
                    <span className="group-hover:text-white">
                        {new Date().toLocaleDateString("pt-BR").replace(/\//g, "-")}
                    </span>
                    <p className="text-2xl font-bold text-success-500 group-hover:text-white">0</p>
                </div>
            </div>

            <div className="group flex items-center gap-4 p-4 bg-white dark:bg-default-100 rounded-lg shadow-md hover:bg-success-500 dark:hover:bg-success-500 transition-colors">
                <ShoppingCartIcon className="size-16 text-success-500 group-hover:text-white" />
                <div>
                    <h3 className="text-lg font-semibold group-hover:text-white">Produtos em estoque</h3>
                    <span className="group-hover:text-white">
                        {new Date().toLocaleDateString("pt-BR").replace(/\//g, "-")}
                    </span>
                    <p className="text-2xl font-bold text-success-500 group-hover:text-white">
                        {allProducts.length}
                    </p>
                </div>
            </div>

            <div className="group flex items-center gap-4 p-4 bg-white dark:bg-default-100 rounded-lg shadow-md hover:bg-warning-500 dark:hover:bg-warning-500 transition-colors">
                <ShieldExclamationIcon className="size-16 text-warning-500 group-hover:text-white" />
                <div>
                    <h3 className="text-lg font-semibold group-hover:text-white">Produtos fora de estoque</h3>
                    <span className="group-hover:text-white">
                        {new Date().toLocaleDateString("pt-BR").replace(/\//g, "-")}
                    </span>
                    <p className="text-2xl font-bold text-warning-500 group-hover:text-white">
                        {unavailableProducts.length}
                    </p>
                </div>
            </div>
        </div>

    );
}
