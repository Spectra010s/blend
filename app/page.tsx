import AnalogClock from "@/components/Analogclock";
export default function Home() {
  return (
   <main className="min-h-screen">
    <div>
     <AnalogClock />
    </div>
    <div>
      
    </div>
    <div className="m-2 scrollbar-none ">
      <div><h2>Recent</h2></div>

      <div className="w-full h-70 border border-black overflow-y-auto scrollbar-hidden">
        <div className="p-5 flex flex-col grid-rows-4 gap-2.5 border">
          <div className="container p-2 border border-gray h-12 w-auto">
          <h3 className="text-foreground">cool boy in drapes</h3>
          </div>
          <div className="container p-2 border border-gray h-12 w-auto">
          <h3 className="text-foreground">cool boy in drapes</h3>
          </div>
          <div className="container p-2 border border-gray h-12 w-auto">
          <h3 className="text-foreground">cool boy in drapes</h3>
          </div>
          <div className="container p-2 border border-gray h-12 w-auto">
          <h3 className="text-foreground">cool boy in drapes</h3>
          </div>
          <div className="container p-2 border border-gray h-12 w-auto">
          <h3 className="text-foreground">cool boy in drapes</h3>
          </div>
          <div className="container p-2 border border-gray h-12 w-auto">
          <h3 className="text-foreground">cool boy in drapes</h3>
          </div>
          <div className="container p-2 border border-gray h-12 w-auto">
          <h3 className="text-foreground">cool boy in drapes</h3>
          </div>
          <div className="container p-2 border border-gray h-12 w-auto">
          <h3 className="text-foreground">cool boy in drapes</h3>
          </div>
        </div>
      </div>
    </div>
   </main>
  );
}
