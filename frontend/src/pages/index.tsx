import Layout from "@/components/home/layout";
import SaleInfo from "@/components/home/saleInfo";
import DefaultLayout from "@/layouts/default";
import { ScrollShadow } from "@heroui/scroll-shadow";

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <SaleInfo />
        <Layout>
          <div className="overflow-auto col-span-3 bg-default-100 px-2 py-4 rounded-t-lg">
            <h1 className="text-xl font-bold uppercase">Faturas Geradas</h1>
            <span>{new Date().toLocaleDateString("pt-BR").replace(/\//g, "-")}</span>
            <ScrollShadow className="h-[400px] mt-4">
              <h1>Teste</h1>
            </ScrollShadow>
          </div>
          <div className="overflow-auto col-start-4 col-span-10 bg-default-100 rounded-t-lg">

          </div>
        </Layout>
      </DefaultLayout>
    </>
  );
}
