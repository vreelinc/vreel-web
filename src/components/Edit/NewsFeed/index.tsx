<<<<<<< HEAD
import HeroSlider from "@shared/Sliders/HeroSlider/HeroSlider";
import Styles from "./Newsfeed.module.scss";
=======
import Styles from "./Newsfeed.module.scss";
import HeroSlider from "@shared/Sliders/HeroSlider/HeroSlider";
>>>>>>> 3d51ef037848a4b1537efac9c83aed70877d4756

const NewsFeed: React.FC = () => {
  return (
    <div className={Styles.news_feed}>
      <div className={Styles.container}>Half Percent</div>
      <div className={Styles.container}>
        <HeroSlider view="Mobile" />
      </div>
    </div>
  );
};

export default NewsFeed;
