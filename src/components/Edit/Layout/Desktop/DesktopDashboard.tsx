import React from 'react';
import { useRouter } from 'next/router';
import { components } from '../../data';
import DesktopSidebar from './DesktopSidebar';
import Styles from './Dashboard-lg.module.scss';

const DesktopDashboard: React.FC = () => {
  const router = useRouter();
  const { item, slug } = router.query;

  const element =
    components.find((obj) => obj.title === item) ||
    components.find((obj) => obj.title === slug);

  return (
    <section className={Styles.d_dashboard}>
      <div className={Styles.d_dashboard__container}>
        <aside className={Styles.left}>
          <div className={Styles.left_content}>
            <div className={Styles.background}></div>
            <DesktopSidebar />
          </div>
        </aside>

        <aside className={Styles.right}>
          {element?.component ? (
            <element.component />
          ) : (
            <div>
              <h1 className={Styles.emptyTitle}>No Components</h1>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
};

export default DesktopDashboard;

{
  /* <aside className='w-[250px]  h-full space-y-2 '>
  <div>
    <img src='/assets/back-icon.svg' alt='' />
  </div>
</aside>; */
}
