import { SellForm } from "./sellForm";
import ProductsTable from "./productsTable";

const PDV = () => {
  return (
    <>
      <div className="w-full h-[calc(100dvh-120px)] grid grid-cols-12 gap-4 overflow-y-hidden">
        <SellForm />
        <div className="overflow-auto col-start-5 col-span-10">
          <ProductsTable />
        </div>
      </div>
    </>
  );
};

export default PDV;
