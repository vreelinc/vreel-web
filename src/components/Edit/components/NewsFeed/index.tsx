import VreelSlider from 'src/components/VreelSlider/VreelSlider';
import Styles from './Newsfeed.module.scss';

const NewsFeed: React.FC = () => {
  return (
    <div className={Styles.news_feed}>
      <div className={Styles.container}>Half Percent</div>
      <div className={Styles.container}>
        <VreelSlider view='Mobile' />
      </div>
    </div>
  );
};

export default NewsFeed;
