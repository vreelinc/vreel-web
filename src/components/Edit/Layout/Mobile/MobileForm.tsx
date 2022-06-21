import { advanceOptions, editOptions } from '../../data';
import MobileFormButton from './MobileFormButton';
import Styles from './MobileForm.module.scss';

const MobileForm: React.FC = () => {
  return (
    <div className={Styles.mobileForm}>
      <div className={Styles.buttonWrapper}>
        {editOptions.map((obj, index) => (
          <MobileFormButton key={index} obj={obj} index={index} />
        ))}
      </div>

      <div
        className={Styles.advanceTitle}
        // className='text-secondary text-lg my-6 advance'
      >
        Advanced
      </div>
      <div className={Styles.buttonWrapper}>
        {advanceOptions.map((obj, index) => (
          <MobileFormButton key={index} obj={obj} index={index} />
        ))}
      </div>
    </div>
  );
};

export default MobileForm;

{
  /* <div className='text-secondary text-lg my-6 advance'>Edit Vreels</div>;
{
  regularOptions.map((obj) => {
    if (obj.children) {
      return (
        <div className='px-4 space-y-5'>
          {obj.children.map((obj, index) => (
            <MobileFormButton key={index} obj={obj} />
          ))}
        </div>
      );
    }
  });
} */
}
