import Image from 'next/image'

/**
 * @param {string} symbol
 * @param {() => void} onClick
 * @param {string} color
 * @returns {JSX.Element} 
 */
export default function Square({ symbol, onClick, color }) {
    let button;

    if (!symbol) {
        button = <button onClick={onClick} className={`flex items-center justify-center bg-gray-200 rounded-xl shrink`} />
    }
    else {
        button = <button onClick={onClick} className={`flex items-center justify-center ${color} rounded-xl shrink`}>
                    <Image src={symbol} width={64} height={64} alt="" className='shrink'></Image>
                 </button>
    }
    
    return button;
}