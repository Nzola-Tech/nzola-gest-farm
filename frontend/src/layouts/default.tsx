import NavBar from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <div className="relative flex flex-col">
        <main className="container w-full px-3 flex-grow">
          {children}
        </main>
      </div>
    </>
  );
}
