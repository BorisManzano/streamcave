import React from "react";
import { useSelector } from "react-redux";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";
import s from "./style.module.scss";

const SwiperFunc = () => {
  const movies = useSelector((state) => state.movies.data);
  console.log(movies);
  return (
    <Swiper
      className={s.large}
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      {movies &&
        movies.payload.map((movie, index) => (
          <SwiperSlide key={index}>
            <img
              src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
              alt="imagen de la pelicula"
            />
          </SwiperSlide>
        ))}
      ...
    </Swiper>
  );
};

export default SwiperFunc;

// Opción 1

// import { useState } from "react";
// import Carousel from "react-bootstrap/Carousel";
// import { useSelector } from "react-redux";
// import s from "./style.module.scss";

// function ControlledCarousel() {
//   const movies = useSelector((state) => state.movies.data);
//   const [index, setIndex] = useState(0);

//   const handleSelect = (selectedIndex) => {
//     setIndex(selectedIndex);
//   };

//   const settings = {
//     slidesPerView: 3, // Número de elementos que se muestran a la vez
//     slidesToScroll: 1, // Número de elementos que se desplazan a la vez
//   };

//   return (
//     <Carousel activeIndex={index} onSelect={handleSelect} {...settings}>
//       {movies &&
//         movies.payload.map((movie, index) => (
//           <Carousel.Item key={index}>
//             <img
//               className={s.large}
//               src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
//               alt="imagen de la pelicula"
//             />
//           </Carousel.Item>
//         ))}
//     </Carousel>
//   );
// }

// export default ControlledCarousel;
