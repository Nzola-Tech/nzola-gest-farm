import DefaultLayout from "@/layouts/default";

export default function Unauthorized() {
  return (
    <>
      <DefaultLayout>
        <h1 className="dark:text-white text-4xl text-center font-bold">
            Acesso negado
        </h1>
      </DefaultLayout>
    </>
  );
}
