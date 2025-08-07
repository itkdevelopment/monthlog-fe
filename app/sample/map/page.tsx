"use client";

import { useEffect, useRef, useState } from "react";

export default function NaverMapSamplePage() {
    const mapRef = useRef<HTMLDivElement>(null);
    const [showMap, setShowMap] = useState(false);

    const loadNaverMap = (): Promise<typeof window.naver.maps> => {
        return new Promise((resolve, reject) => {
            if (window.naver && window.naver.maps) {
                resolve(window.naver.maps);
                return;
            }

            const script = document.createElement("script");
            script.src = "https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=co3mq3zzhp";
            script.async = true;
            script.onload = () => resolve(window.naver.maps);
            script.onerror = reject;
            document.head.appendChild(script);
        });
    };

    useEffect(() => {
        if (!showMap) return;

        (async () => {
            const maps = await loadNaverMap();
            if (!mapRef.current) return;

            const data = [
                { mapy: 37.359924641705476, mapx: 127.1148204803467 },
                { mapy: 37.378546827477855, mapx: 127.11984157562254 },
                { mapy: 37.376637072444105, mapx: 127.12052822113036 },
                { mapy: 37.37530703574853, mapx: 127.12190151214598 },
                { mapy: 37.371657839593894, mapx: 127.11645126342773 },
                { mapy: 37.36855417793982, mapx: 127.1207857131958 },
            ];

            const map = new maps.Map(mapRef.current, {
                center: new maps.LatLng(data[0].mapy, data[0].mapx),
                zoom: 14,
            });

            const path = [];

            data.forEach((point, index) => {
                const latlng = new maps.LatLng(point.mapy, point.mapx);
                path.push(latlng);

                new maps.Marker({
                    position: latlng,
                    map: map,
                    title: `Point ${index + 1}`,
                });
            });

            new maps.Polyline({
                path,
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 3,
                map: map,
            });
        })();
    }, [showMap]);

    // 경로 맵 열기
    const handleOpenRouteMap = () => {
        setShowMap(true);
    };

    // 네이버 맵 바로 연결
    const handleOpenNaverMap = () => {
        // Mock API 응답값
        const data = {
            addr1: "대구광역시 동구 효목동 산 234-29",
            addr2: "234-29",
            mapx: 128.6506352,
            mapy: 35.88261958,
            title: "동촌유원지"
        };

        // open map.naver.com by mapx, mapy, and address
        // const fullAddress = `${data.addr1} ${data.addr2}`;
        // const encodedAddress = encodeURIComponent(fullAddress);
        // const mapUrl = `https://map.naver.com/p/search/${encodedAddress}/address/${data.mapx},${data.mapy},${encodedAddress},new?c=15.00,0,0,0,dh&isCorrectAnswer=true`;

        // open map.naver.com by title
        const mapUrl = `https://map.naver.com/p/search/${data.title}`;

        // 새 탭으로 열기
        window.open(mapUrl, "_blank");
    };

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <button onClick={handleOpenRouteMap}>use Naver API to show polyine and marker</button>
                <button onClick={handleOpenNaverMap}>open map.naver.com in new tab</button>
            </div>

            {showMap && (
                <div
                    ref={mapRef}
                    style={{
                        width: "100%",
                        height: "400px",
                        border: "1px solid #ccc",
                        marginTop: "20px",
                    }}
                />
            )}
        </div>
    );
}
