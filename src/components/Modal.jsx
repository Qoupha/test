import '../index.css'
import {useEffect, useRef, useState} from "react";
import * as LightweightCharts from "lightweight-charts";

function Modal({ token, handleClose }){
    const contentRef = useRef();
    const [isLoading, setIsLoading] = useState(true);

    const close = (e) => {
        if (e.currentTarget === e.target) {
            handleClose();
        }
    }

    useEffect(() => {
        const formData = new FormData();
        formData.append("s", token);
        formData.append("key", "00000907000105060106");
        formData.append("tf", "4h");
        fetch("https://sowatrends.ru/robots/graph?deals=crypto", {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(({data}) => {
                const chartMGNT = LightweightCharts.createChart(
                    contentRef.current,
                    {
                        layout: {
                            backgroundColor: "#edf6ff",
                            textColor: "#000",
                        },
                        crosshair: {
                            mode: LightweightCharts.CrosshairMode.Normal,
                        },
                        priceScale: {
                            borderColor: "#ccc",
                        },
                        timeScale: {
                            borderColor: "rgba(197, 203, 206, 0.8)",
                            timeVisible: true,
                            secondsVisible: false,
                        },
                    }
                );

                chartMGNT.applyOptions({
                    watermark: {
                        color: "rgba(123, 33, 104, 0.4)",
                        visible: true,
                        text: `${token} 4h`,
                        fontSize: 24,
                        horzAlign: "left",
                        vertAlign: "bottom",
                        autoScale: false,
                    },
                });

                const barSeriesMGNT = chartMGNT.addCandlestickSeries({
                    upColor: "#00ff00",
                    downColor: "#ff0000",
                    borderDownColor: "#000",
                    borderUpColor: "#000",
                    wickDownColor: "rgba(123, 33, 104, 1)",
                    wickUpColor: "rgba(123, 33, 104, 1)",
                });
                setIsLoading(false);
                barSeriesMGNT.setData(data);
            })
    }, [])

    return(
        <div className='modalWrapper' onClick={close}>
            <div className="modalContentWrapper">
                <div className="modalContent" ref={contentRef}>
                    { isLoading && <h1>Загрузка...</h1>}
                </div>
            </div>
        </div>
    )
}
export default Modal