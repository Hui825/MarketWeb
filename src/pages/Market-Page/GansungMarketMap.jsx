import React, { useEffect } from 'react';
import './GansungMarketMap.css';

const GanseongMarketMap = () => {
  useEffect(() => {
    const loadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(38.38010968, 128.4697287),
          level: 3,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        const markerPosition = new window.kakao.maps.LatLng(38.38010968, 128.4697287);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);

        const content = `
          <div class="wrap">
            <div class="info">
              <div class="title">
                간성시장
                <div class="close" onclick="closeOverlay()" title="닫기"></div>
              </div>
              <div class="body">
                <div class="img">
                  <img src="https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=13156773&filePath=L2Rpc2sxL25ld2RhdGEvMjAxOC8yMS9DTFMxLzEzMTU2NzczX0NPTENUXzIwMTgxMTI2XzE=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004" width="73" height="70">
                </div>
                <div class="desc">
                  <div class="ellipsis">강원도 고성군 간성시장2길 9-2</div>
                  <div class="jibun ellipsis">033-682-7885</div>
                  <div><a href="http://ganseongmarket.modoo.at/" target="_blank" class="link">홈페이지</a></div>
                </div>
              </div>
            </div>
          </div>`;

        const overlay = new window.kakao.maps.CustomOverlay({
          content: content,
          map: map,
          position: marker.getPosition(),
        });

        window.kakao.maps.event.addListener(marker, 'click', () => {
          overlay.setMap(map);
        });

        window.closeOverlay = function () {
          overlay.setMap(null);
        };
      } else {
        console.error('Kakao Maps API is not loaded');
      }
    };

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=d88ca8f1c2916960151011d64a2d5aa3&autoload=false`;
    script.async = true;
    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(loadKakaoMap);
      } else {
        console.error('Kakao Maps API is not loaded');
      }
    };
    script.onerror = () => console.error('Kakao Maps API 스크립트 로드 실패');

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '600px' }}></div>
  );
};

export default GanseongMarketMap;
