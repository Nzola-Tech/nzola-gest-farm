import PDV from "@/components/pdv";
import DefaultLayout from "@/layouts/default";

export default function VendasPdv() {
  return (
  <>  
    <DefaultLayout>
      <PDV products={[]} db={undefined} onSaleComplete={function (): void {
          throw new Error("Function not implemented.");
        } } /> 
    </DefaultLayout>
  </>
  );
}
