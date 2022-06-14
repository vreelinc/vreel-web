import clsx from "clsx";
import { useSelector } from "react-redux";
import { expandShare } from "src/redux/createSlice/createMenuSlice";
import { RootState, useAppDispatch } from "src/redux/store/store";
import Styles from "./Share.module.scss";
import * as IoIcons from "react-icons/io";
import { data } from "./shareData";
import { useRouter } from "next/router";
import Sheet, { SheetRef } from "react-modal-sheet";
import * as CgIcons from "react-icons/cg";
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

const Share: React.FC = () => {
  const state = useSelector(
    (state: RootState) => state.expandMenu.initShareState
  );
  const dispatch = useAppDispatch();
  const ref = useRef<SheetRef>();
  const snapTo = (i: number) => ref.current?.snapTo(i);
  const router = useRouter();
  const { username } = router?.query;
  const shareLink = "https://vreel.page/" + username;
  return (
    <Sheet
      ref={ref}
      isOpen={state}
      onClose={() => console.log("hello")}
      snapPoints={[600, 400, 100, 0]}
      initialSnap={2}
      onSnap={(snapIndex) =>
        console.log("> Current snap point index:", snapIndex)
      }
    >
      <Sheet.Container>
        <Sheet.Content>
          <div
            className={clsx(
              Styles.share,
              state ? Styles.share__show : Styles.share__hidden
            )}
          >
            <div className={clsx(Styles.content)}>
              <button
                onClick={() => dispatch(expandShare())}
                className={Styles.bar__icon}
              ></button>

              <h4>Connect </h4>
              <div className={clsx(Styles.btn__container)}>
                <FacebookShareButton url={shareLink} quote="facebook">
                  <FacebookIcon size={60} round />
                </FacebookShareButton>

                <TwitterShareButton url={shareLink} title="Twitter">
                  <TwitterIcon size={60} round />
                </TwitterShareButton>

                <LinkedinShareButton url={shareLink} title="Linkedin">
                  <LinkedinIcon size={60} round />
                </LinkedinShareButton>

                <WhatsappShareButton url={shareLink} title="whatApps">
                  <WhatsappIcon size={60} round />
                </WhatsappShareButton>

                <TumblrShareButton title="tumblr" url={shareLink}>
                  <TumblrIcon size={60} round />
                </TumblrShareButton>

                <EmailShareButton url={shareLink} subject="email" body="body">
                  <EmailIcon size={60} round />
                </EmailShareButton>

                <ViberShareButton title="viber" url={shareLink}>
                  <ViberIcon size={60} round />
                </ViberShareButton>

                <TelegramShareButton url={shareLink}>
                  <TelegramIcon size={60} round />
                </TelegramShareButton>
              </div>

              <h4>QR Code</h4>
              <QrCode />
              <button className={Styles.btn_orange}>Save QR Code</button>

              <h4>Share Vreel</h4>
              <div className={Styles.userAddress__container}>
                <span>{`www.vreel.page/${username}`}</span>
              </div>
              <button
                onClick={() => {
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
