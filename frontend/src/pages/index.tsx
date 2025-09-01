import Layout from "@/components/home/layout";
import SaleInfo from "@/components/home/saleInfo";
import DefaultLayout from "@/layouts/default";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { EyeIcon } from "@heroicons/react/24/solid";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { productsSoldToday,totalSalesToday as TotalSaleToday } from "@/database";
import { useDbStore } from "@/store/db-store";
import { useEffect, useState } from "react";

export default function Home() {

  const [soldToday, setSoldToday] = useState(0);
  const [totalSalesToday, setTotalSalesToday] = useState(0);
  const { db } = useDbStore();

  useEffect(() => {
    const fetchData = async () => {
      const result = await productsSoldToday(db);
      const resultTotal = await TotalSaleToday(db);
      setSoldToday(result);
      setTotalSalesToday(resultTotal);
    };
    fetchData();
  }, [db]);

  return (
    <>
      <DefaultLayout>
        <SaleInfo soldToday={soldToday} totalSalesToday={totalSalesToday} />
        <Layout>
          <div className="overflow-auto col-span-3 shadow-lg px-2 py-4 rounded-t-lg dark:bg-default-100">
            <div className="flex justify-between items-center">
              <h1 className="font-bold uppercase">Faturas</h1>
              <div className="flex items-center gap-x-2">
                <CalendarDaysIcon className="size-6" />
                <span>
                  Hoje, {(() => {
                    const data = new Date().toLocaleDateString("pt-BR").split("/");
                    return `${data[0]} ${data[2]}`;
                  })()}
                </span>
              </div>
            </div>
            <ScrollShadow className="h-[400px] mt-8" >
              <Listbox aria-label="Action" color="primary">
                <ListboxItem textValue="text">
                  <div className="flex justify-between items-center">
                    <span>Nº FR {new Date().getFullYear()}/1</span>
                    <EyeIcon className="size-6 " />
                  </div>
                </ListboxItem>
                <ListboxItem textValue="text">
                  <div className="flex justify-between items-center">
                    <span>Nº FR {new Date().getFullYear()}/1</span>
                    <EyeIcon className="size-6 " />
                  </div>
                </ListboxItem>
              </Listbox>
            </ScrollShadow>
          </div>
          <div className="overflow-auto col-start-4 col-span-10 shadow-xl rounded-t-lg dark:bg-default-100">

          </div>
        </Layout>
      </DefaultLayout>
    </>
  );
}
