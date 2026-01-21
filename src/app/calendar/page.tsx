import CalendarView from "./components/CalendarView";

export default function CalendarPage() {
    return (
        <div className="flex h-[890px] bg-blue-400 p-6">
           <div className=" w-[990px] p-4 ml-auto">
            <h1 className=" text-2xl font-bold mb-6 text-black text-center">
                Gestão de Disponibilidades
                </h1> 
             <CalendarView/> 
            </div>
        </div>
    )
}