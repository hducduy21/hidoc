import Slider from 'react-slick';
import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CardComponent from '~/components/User/CardComponent';
import Images from '~/assets/Images';
import { useSelector } from 'react-redux';

function Slick({ type = 1, list }) {
    const settings1 = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 4000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 990,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    const settings2 = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        speed: 2000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 990,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    let setting = type === 1 ? settings1 : settings2;
    return (
        <div>
            <h2 className="text-left" style={{ margin: '30px 0', textAlign: 'left', fontSize: '22px' }}>
                {' '}
                {type === 1 ? 'Bác sĩ nổi bật' : 'Bệnh viện/phòng khám nổi bật'}{' '}
            </h2>
            <Slider {...setting}>
                {list.map((e, id) => {
                    return (
                        <div className="slickComponent" key={id}>
                            <CardComponent
                                type={type}
                                name={e.name}
                                descript={e.descript || ''}
                                level={e.level || ''}
                                img={e.link || e.img || ''}
                                id={e.username || e.Username || ''}
                                hid={e.hid || ''}
                            />
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}

export default Slick;
