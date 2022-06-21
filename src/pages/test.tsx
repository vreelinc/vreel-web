import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Mousewheel } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Styles from './test.module.scss';
// import BottomSheetContainer from 'src/components/Shared/BottomSheet/BottomSheetContainer/BottomSheetContainer';

export default function test() {
  return (
    // <BottomSheetContainer title='Container'>
    //   <main className={Styles.gridContainer}></main>
    // </BottomSheetContainer>
  );
}

// https://github.com/nygardk/react-share/blob/master/demo/Demo.tsx
{
  /* <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          loop
          pagination={{
            clickable: true,
          }}
          slidesPerView={1}
          style={{ height: "100vh" }}
        >
          <SwiperSlide></SwiperSlide>
          <SwiperSlide>4</SwiperSlide>
          <SwiperSlide>5</SwiperSlide>
        </Swiper> */
}
