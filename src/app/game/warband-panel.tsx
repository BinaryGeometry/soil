export function WarbandPanel({warband}){
    
    const den = 'burrow';
    console.log('warband!!!!!!', warband)
    return (
    <div className="flex flex-col">
        <div className="flex-none flex">
            <div className="flex-none flex flex-col ">
            
                <div className="border-solid border-[#d19e8e] border-2 border-b-0 border-r-0 text-center p-1 bg-[#f0e7e4] text-[#2c2e35]">Allegience</div>
                <div className="border-solid border-[#d19e8e] border-2 border-b-0 border-r-0  text-center p-1 bg-[#ffffff] text-[#2c2e35]">{warband?.allegience}</div>
                <div className="border-solid border-2 border-[#d19e8e] border-b-0 border-r-0 text-center p-1 bg-[#f0e7e4] text-[#2c2e35]">Labour</div>
                <div className="border-solid border-2 border-[#d19e8e] border-r-0 text-center p-1 bg-[#ffffff] text-[#2c2e35]">{warband?.allegience}</div>
            </div>
            <div className="flex-none flex flex-col">
                <div className="border-solid border-[#d19e8e] border-2 border-b-0 border-r-0 text-center p-1 bg-[#f0e7e4]  text-[#2c2e35]">Warband Name</div>
                <div className="border-solid border-[#d19e8e] border-2 border-b-0 border-r-0 font-semibold text-center p-1 bg-[#ffffff] text-[#2c2e35]">{warband?.name}</div>
                <div className="border-solid border-2 border-[#d19e8e] border-b-0 border-r-0 text-center p-1 bg-[#f0e7e4] text-[#2c2e35]">Warband Rating</div>
                <div className="border-solid border-2 border-[#d19e8e] border-r-0 text-center p-1 bg-[#ffffff] text-[#2c2e35]">n/a</div>
            </div>
            <div className="flex-none flex flex-col">
                <div className="border-solid border-[#d19e8e] border-2 border-b-0  text-center p-1 bg-[#f0e7e4] text-[#2c2e35]">Den</div>
                <div className="border-solid border-[#d19e8e] border-2 border-b-0  text-center p-1 bg-[#ffffff] text-[#2c2e35]">{warband?.den}</div>
                <div className="border-solid border-2 border-[#d19e8e] border-b-0  text-center p-1 bg-[#f0e7e4] text-[#2c2e35]">Pennies</div>
                <div className="border-solid border-2 border-[#d19e8e]  text-center p-1 bg-[#ffffff] text-[#2c2e35]">{warband?.pennies}</div>
            </div>
        </div>
    </div>
    )
}
