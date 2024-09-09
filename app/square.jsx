import Image from 'next/image'

export default function Square({ id, value, onSquareClick, color }) {
    let button;

    if (!value) {
        button = <button id={id} onClick={onSquareClick} className={`flex items-center justify-center bg-gray-200 rounded-xl shrink`} />
    }
    else {
        button = <button id={id} onClick={onSquareClick} className={`flex items-center justify-center ${color} rounded-xl shrink`}>
                    <Image src={value} width={64} height={64} alt="" className='shrink'></Image>
                 </button>
    }

    return (button);
}