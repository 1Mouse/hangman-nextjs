import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

type TimerProps={
    reset:()=>void
}

const Timer = ({reset}:TimerProps) => {
    const router=useRouter();
    const [timer, setTimer] = useState<number>(500);


    useEffect(() => {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    , []);

    useEffect(() => {
        if (timer === 0) {
            reset();
        }
    }, [timer]);

    return (
            <code className="" style={{padding:"10px", marginTop:"5px",color:"black", fontSize:"1.5rem", background:"white"}}>
                {timer}
            </code>
    );
};

export default Timer;
