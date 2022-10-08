import clsx from "clsx";
import { useSelector } from "react-redux";
import { expandShare } from "src/redux/createSlice/createMenuSlice";
import { RootState, useAppDispatch } from "src/redux/store/store";
import Styles from "./Share.module.scss";
import { data } from "./shareData";
import { useRouter } from "next/router";
import Sheet, { SheetRef } from "react-modal-sheet";

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TumblrShareButton,
  TwitterIcon,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { useRef } from "react";
import QR, { QrCode } from "../QR";
import toast from "react-hot-toast";
import SliderCrossButton from "@shared/Buttons/SliderCrossButton/SliderCrossButton";

const Share: React.FC = () => {
  const state = useSelector(
    (state: RootState) => state.expandMenu.initShareState
  );
  const dispatch = useAppDispatch();
  const ref = useRef<SheetRef>();
  const qrcodeRef = useRef(null);
  // const snapTo = (i: number) => ref.current?.snapTo(i);
  const router = useRouter();

  const { username } = router?.query;
  const base = process.env.NEXT_PUBLIC_SITE_BASE_URL;

  return (
    <Sheet
      ref={ref}
      isOpen={state}
      onClose={() => { }}
      onSnap={(snapIndex) => { }
      }
      disableDrag={true}
    >
      <Sheet.Container onViewportBoxUpdate={() => { }}>
        <Sheet.Content onViewportBoxUpdate={() => { }}>
          <div
            className={clsx(
              Styles.share,
              state ? Styles.share__show : Styles.share__hidden
            )}
          >
            <div className={clsx(Styles.content)}>
              {/* <button
                onClick={() => dispatch(expandShare())}
                className={Styles.bar__icon}
              ></button> */}
              <div className={Styles.content__crossIcons}>
                <SliderCrossButton
                  position="absolute"
                  top={1}
                  right={1}
                  method={() => dispatch(expandShare())}
                />
              </div>

              <h4>Share </h4>
              <div className={clsx(Styles.btn__container)}>
                <FacebookShareButton
                  url={base + router.asPath}
                  quote="facebook"
                >
                  <FacebookIcon size={60} round />
                </FacebookShareButton>

                <TwitterShareButton url={base + router.asPath} title="Twitter">
                  <TwitterIcon size={60} round />
                </TwitterShareButton>

                <LinkedinShareButton
                  url={base + router.asPath}
                  title="Linkedin"
                >
                  <LinkedinIcon size={60} round />
                </LinkedinShareButton>

                <WhatsappShareButton
                  url={base + router.asPath}
                  title="whatApps"
                >
                  <WhatsappIcon size={60} round />
                </WhatsappShareButton>

                <TumblrShareButton title="tumblr" url={base + router.asPath}>
                  <TumblrIcon size={60} round />
                </TumblrShareButton>

                <EmailShareButton
                  url={base + router.asPath}
                  subject="email"
                  body="body"
                >
                  <EmailIcon size={60} round />
                </EmailShareButton>

                {/* <ViberShareButton title="viber" url={base + router.asPath}>
                  <ViberIcon size={60} round />
                </ViberShareButton>

                <TelegramShareButton url={base + router.asPath}>
                  <TelegramIcon size={60} round />
                </TelegramShareButton> */}
              </div>

              {/* <h4>QR Code</h4>
              <div>
                <QrCode ref={qrcodeRef} url={base + router.asPath} />
              </div>
              <button
                className={Styles.btn_orange}
                onClick={() => {
                  const canvasSave = document.getElementById(
                    "react-qrcode-logo"
                  ) as HTMLCanvasElement;
                  const d = canvasSave.toDataURL("image/png");
                  // Just I need be make sure ToDataURL working here. Then I willbe able to copy this into to the clipboard.
                  console.log(d);
                }}
              >
                Save QR Code
              </button> */}

              <h4>Share Slide</h4>
              <div className={Styles.userAddress__container}>
                <span>{base + router.asPath}</span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(base + router.asPath);
                  dispatch(expandShare());
                  toast.success("Copied Successful!");
                }}
                className={Styles.btn_orange}
              >
                Copy Link
              </button>
            </div>
          </div>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default Share;
