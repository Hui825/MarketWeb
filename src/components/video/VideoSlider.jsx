import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

const VideoSlider = ({ id, title, videos }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, []);

    const videoClass = loading ? 'isLoading' : 'isLoaded';

    return (
        <section id={id} className={videoClass}>
            <h2>{title}</h2>
            <div className="video__slider">
                <Swiper 
                    slidesPerView={1}
                    spaceBetween={20}
                    navigation={true} 
                    modules={[Navigation]} 
                    className={`mySwiper-${id}`}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 20
                        },
                        1600: {
                            slidesPerView: 5,
                            spaceBetween: 20
                        }
                    }}
                >
                    {videos.map((video, key) => (
                        <SwiperSlide key={key}>
                            <div className="video">
                                <div className="video__thumb play__icon">
                                    <Link to={`/video/${video.videoId}`}>
                                        <img src={video.img} alt={video.title} />
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

export default VideoSlider