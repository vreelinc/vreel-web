import clsx from "clsx";
import { useSelector } from "react-redux";
import { QRCode } from "react-qrcode-logo";
import { expandQR } from "src/redux/createSlice/createMenuSlice";
import { RootState, useAppDispatch } from "src/redux/store/store";
import Sheet, { SheetRef } from "react-modal-sheet";
import Styles from "./QR.module.scss";
import { useRef } from "react";
import { useRouter } from "next/router";

const QR: React.FC = () => {
  const state = useSelector((state: RootState) => state.expandMenu.initQRState);
  const dispatch = useAppDispatch();
  const ref = useRef<SheetRef>();
  const snapTo = (i: number) => ref.current?.snapTo(i);
  const router = useRouter();
  console.log({ router });

  return (
    <Sheet
      ref={ref}
      isOpen={state}
      onClose={() => console.log("hello")}
      snapPoints={[600, 400, 100, 0]}
      initialSnap={0}
      onSnap={(snapIndex) =>
        console.log("> Current snap point index:", snapIndex)
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
                <QrCode />
              </div>

              <div>
                <img
                  src="/assets/icons/vreel-powered.svg"
                  alt="Powered By VReel"
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

export function QrCode(props) {
  const defaultOptions = {
    ecLevel: "M",
    enableCORS: false,
    size: 150,
    quietZone: 10,
    bgColor: "#FFFFFF",
    fgColor: "#000000",
    logoImage:
      "https://res.cloudinary.com/klwebco/image/upload/v1655087042/Frame_50254_ag47l8.png",
    logoWidth: 50,
    logoHeight: 50,
    logoOpacity: 1,
    qrStyle: "squares",
    eyeRadius: [
      [0, 10, 10, 10], // top/left eye
      [10, 0, 10, 10], // top/right eye
      [10, 10, 10, 0], // bottom/left
    ],
  };

  const options = { ...defaultOptions, ...props.options };

  return <QRCode value={props.url} {...options} />;
}
