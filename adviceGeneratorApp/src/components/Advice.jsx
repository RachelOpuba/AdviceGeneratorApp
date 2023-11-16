import { useState, useEffect } from "react"
import desktopDivider from "../assets/pattern-divider-desktop.svg"
import mobileDivider from "../assets/pattern-divider-mobile.svg"
import dice from "../assets/icon-dice.svg"

const Advice = () => {
    const [adviceData, setAdviceData] = useState({ number: 0, advice: "" });
    const [error, setError] = useState(null);
    const fetchAdvice = async () => {
        try {
          const response = await fetch('https://api.adviceslip.com/advice');
          const data = await response.json();
          setAdviceData({ number: data.slip.id, advice: data.slip.advice });
          setError(null); // Clear any previous errors
        } catch (error) {
          console.error('Error fetching advice:', error);
          setError('Error fetching advice. Please try again.'); // Set error message
        }
      };

      useEffect(() => {
        // Fetch advice on component mount
        fetchAdvice();
      }, []);

      const handleGenerateAdvice = () => {
        // Fetch new advice when the button is clicked
        fetchAdvice();
      };

  return (
    < >
        <div>
            <div className='flex flex-col justify-center items-center bg-[#323a49] w-[95%] md:w-[530px] px-2 md:px-10 p-10 pb-10 rounded-[12px] gap-4 relative font-manrope mx-auto'>
                <header className='text-[#52ffa8] '>
                    <p className='uppercase tracking-[3px]'>Advice <span className="ms-1">#{adviceData.number}</span></p>
                </header>
                <main className='text-center pb-2'>
                {error ?( <div className="text-red-500 mt-4">{error}</div>) : (
                     

              
                 <q className='text-[28px] text-[#cee3e9] font-manrope '> 
                    {adviceData.advice}
                    
                 </q>
                )}
                </main>
                   
                {/* <img src={divider} alt="Divider" /> */}
                <picture className="pb-6 pt-2">
                    <source media="(min-width: 768px)" srcSet={desktopDivider}/>
                    <img src={mobileDivider} alt="Divider" />
                </picture>
                <button onClick={handleGenerateAdvice}  className="bg-[#52ffa8] h-[52px] w-[52px] flex justify-center items-center rounded-full absolute bottom-[-30px]  cursor-pointer">
                    <img src={dice} alt="Dice"  className="h-[20px] " />
                </button>
            </div>
        </div>
    
    </>
  )
}

export default Advice