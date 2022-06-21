import UserProfile from '../../../Shared/UserProfile/UserProfile';
import MobileForm from './MobileForm';
import Styles from './MobileDashboard.module.scss';

const MobileDashboard: React.FC = () => {
  return (
    <section className={Styles.mobileDash}>
      <div
        className={Styles.container}

        // className='flex justify-center px-4'
      >
        <div
          className={Styles.wrapper}
          // className='flex space-x-6'
        >
          <button className='btn-save'>Save</button>
          {/* <ToggleButton /> */}
          <UserProfile section='edit' />
        </div>
      </div>

      <div className={Styles.content}>
        <MobileForm />
      </div>
    </section>
  );
};

export default MobileDashboard;

{
  /* <div>
<div
  onClick={() => {
    setButtonState(!buttonState);
    router.push('/');
  }}
  className={`border-2 border-white rounded-[38px] w-36  overflow-hidden flex transition-all duration-200 ease-in ${
    buttonState
      ? 'justify-start bg-vreel_gray '
      : 'justify-end  bg-secondary'
  }`}
>
  <button className='text-base capitalize px-4 py-2 bg-white text-black rounded-[38px] transition-all duration-200 ease-in'>
    {buttonState ? 'View' : 'Edit'}
  </button>
</div>
<p className='text-white font-medium text-sm mt-2'>
  Toggle To View VReel
</p>
</div> */
}
