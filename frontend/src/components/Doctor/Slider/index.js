import Carousel from 'react-bootstrap/Carousel';
import Images from '~/assets/Images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcaseMedical } from '@fortawesome/free-solid-svg-icons';

function Slider() {
    return (
        <Carousel>
            <Carousel.Item interval={5000}>
                <img className="d-block w-100" src={Images.doctorslider2} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <img className="d-block w-100" src={Images.doctorslider1} alt="Second slide" />
            </Carousel.Item>
        </Carousel>
    );
}

export default Slider;
