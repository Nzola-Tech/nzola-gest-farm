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
        <main className="container max-w-7xl px-3 flex-grow">
          {children}
        </main>
      </div>
    </>
  );
}
