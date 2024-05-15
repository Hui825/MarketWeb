import React, { useEffect } from 'react';

const YangyangMarketMap = () => {
    useEffect(() => {
        const initMap = () => {
            const mapContainer = document.getElementById('map'); // 지도를 표시할 div
            const mapOption = { 
                center: new window.kakao.maps.LatLng(38.072621, 128.619512), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };
            const map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

            const overlayContent = `
                <div class="wrap">
                    <div class="info">
                        <div class="title">
                            양양전통시장
                            <div class="close" onclick="closeOverlay()" title="닫기"></div>
                        </div>
                        <div class="body">
                            <div class="img">
                                <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/placeholder.png" width="73" height="71">
                            </div>
                            <div class="desc">
                                <div class="ellipsis">강원도 양양군 양양읍 남문5길 9</div>
                                <div class="jibun ellipsis">(우) 25022 (지번) 남문리 8-1</div>
                                <div><a href="https://map.kakao.com/link/map/양양전통시장,38.072621,128.619512" target="_blank" class="link">큰지도보기</a> <a href="https://map.kakao.com/link/to/양양전통시장,38.072621,128.619512" target="_blank" class="link">길찾기</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            const overlay = new window.kakao.maps.CustomOverlay({
                content: overlayContent,
                map: map,
                position: map.getCenter()
            });

            window.closeOverlay = function() {
                overlay.setMap(null);   
            };
        };

        const loadScript = () => {
            const script = document.createElement('script');
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=d88ca8f1c2916960151011d64a2d5aa3&autoload=false`;
            script.async = true;
            script.onload = () => {
                if (window.kakao && window.kakao.maps) {
                    window.kakao.maps.load(() => {
                        initMap();
                    });
                }
            };
            document.head.appendChild(script);
        };

        if (!window.kakao || !window.kakao.maps) {
            loadScript();
        } else {
            window.kakao.maps.load(() => {
                initMap();
            });
        }

        return () => {
            const script = document.querySelector('script[src="//dapi.kakao.com/v2/maps/sdk.js?appkey=d88ca8f1c2916960151011d64a2d5aa3&autoload=false"]');
            if (script) {
                document.head.removeChild(script);
            }
        };
    }, []);

    return (
        <div>
            <style>{`
                .wrap {position: absolute;left: 0;bottom: 40px;width: 288px;height: 132px;margin-left: -144px;text-align: left;overflow: hidden;font-size: 12px;font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;line-height: 1.5;}
                .wrap * {padding: 0;margin: 0;}
                .wrap .info {width: 286px;height: 120px;border-radius: 5px;border-bottom: 2px solid #ccc;border-right: 1px solid #ccc;overflow: hidden;background: #fff;}
                .wrap .info:nth-child(1) {border: 0;box-shadow: 0px 1px 2px #888;}
                .info .title {padding: 5px 0 0 10px;height: 30px;background: #eee;border-bottom: 1px solid #ddd;font-size: 18px;font-weight: bold;}
                .info .close {position: absolute;top: 10px;right: 10px;color: #888;width: 17px;height: 17px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png');}
                .info .close:hover {cursor: pointer;}
                .info .body {position: relative;overflow: hidden;}
                .info .desc {position: relative;margin: 13px 0 0 90px;height: 75px;}
                .desc .ellipsis {overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
                .desc .jibun {font-size: 11px;color: #888;margin-top: -2px;}
                .info .img {position: absolute;top: 6px;left: 5px;width: 73px;height: 71px;border: 1px solid #ddd;color: #888;overflow: hidden;}
                .info:after {content: '';position: absolute;margin-left: -12px;left: 50%;bottom: 0;width: 22px;height: 12px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}
                .info .link {color: #5085BB;}
            `}</style>
            <div id="map" style={{ width: '100%', height: '500px' }}></div>
        </div>
    );
};

export default YangyangMarketMap;
