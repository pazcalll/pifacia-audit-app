export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center w-full md:w-[calc(100vw-4rem)] lg:w-[calc(100vw-6rem)] h-screen">
      {children}
    </div>
  );
}
