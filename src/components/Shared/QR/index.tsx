import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { expandQR } from 'src/redux/createSlice/createMenuSlice';
import { RootState, useAppDispatch } from 'src/redux/store/store';
import Sheet, { SheetRef } from 'react-modal-sheet';
import Styles from './QR.module.scss';
import { useRef } from 'react';

const QR: React.FC = () => {
  const state = useSelector((state: RootState) => state.expandMenu.initQRState);
  const dispatch = useAppDispatch();
  const ref = useRef<SheetRef>();
  const snapTo = (i: number) => ref.current?.snapTo(i);

  return (
    <Sheet
      ref={ref}
      isOpen={state}
      onClose={() => console.log('hello')}
      snapPoints={[600, 400, 100, 0]}
      initialSnap={0}
      onSnap={(snapIndex) =>
        console.log('> Current snap point index:', snapIndex)
      }
    >
      <Sheet.Container>
        <Sheet.Content>
          <div
            className={clsx(
              Styles.qr,
              state ? Styles.qr__show : Styles.qr__hidden
            )}
          >
            <div className={Styles.content}>
              <button
                onClick={() => dispatch(expandQR())}
                className={Styles.bar__icon}
              ></button>
              <h2 className={Styles.qr__title}>
                Avangard <br /> qr code
              </h2>
              <div className={Styles.qr__imageWrapper}>
                <img src='/assets/icons/vreel-qr.svg' alt='QR image' />
              </div>

              <div>
                <img
                  src='/assets/icons/vreel-powered.svg'
                  alt='Powered By VReel'
                />
              </div>
            </div>
          </div>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default QR;
