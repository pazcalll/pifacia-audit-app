import { AuthorizationButtons } from "@/components/fragments/authorization-buttons";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-6xl text-bold font-extrabold mb-5 text-center w-full">
          App Transaksi
        </h1>
        <p className="text-center">
          Selamat datang pengguna, silakan pilih otorisasi login anda di bawah
          ini!
        </p>
        <AuthorizationButtons />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <small>By Yazeed Qholili Arifin</small>
      </footer>
    </div>
  );
}
