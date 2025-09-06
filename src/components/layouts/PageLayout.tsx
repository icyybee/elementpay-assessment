export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex lg:flex-row flex-col lg:gap-0 gap-4 items-center lg:justify-center">
      <div className="w-full max-w-4xl flex flex-col gap-4 items-start sm:pl-6 px-6 lg:mt-0 mt-[20%]">
        <span className="lg:m-0 m-auto w-fit inline-flex items-center gap-2 text-sm sm:text-[16px] bg-gray-100 border-green-500 border text-gray-800 font-semibold px-4 py-2 rounded-full shadow-sm">
          <span className="sm:size-2.5 size-2 bg-green-500 rounded-full animate-blink"></span>
          Welcome 👋🏽
        </span>

        <h1 className="text-[40px] sm:text-5xl lg:text-6xl xl:text-7xl md:font-bold font-semibold text-gray-800 leading-tight lg:text-start text-center">
          Pay for anything with <span className="text-green-500">Crypto,</span>{" "}
          as simply as saying <span className="text-green-500">Cheese!</span>
        </h1>
      </div>

      <main className="w-full flex flex-col items-center justify-center p-6">
        {children}
      </main>
    </div>
  );
}
