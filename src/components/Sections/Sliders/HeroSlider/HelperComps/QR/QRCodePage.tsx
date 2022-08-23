import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling, {
  Options as QRCodeStylingOptions,
  FileExtension,
  Options,
  TypeNumber,
  Mode,
  DrawType,
  ErrorCorrectionLevel,
  DotType,
  CornerSquareType,
  CornerDotType,
} from "qr-code-styling";
import Styles from "./QRCodePage.module.scss";

// const qrOptions: QRCodeStylingOptions = {
//   width: 300,
//   height: 300,
//   data: "https://qr-code-styling.com",
//   margin: 0,
//   qrOptions: { typeNumber: 3, mode: "Byte", errorCorrectionLevel: "Q" },
//   imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 0 },
//   dotsOptions: { type: "extra-rounded", color: "#2a2729" },
//   backgroundOptions: { color: "#ffffff", gradient: null },
//   image: "10cc19bd484118dbcd0a7886a38ceddc.png",
//   dotsOptionsHelper: {
//     colorType: { single: true, gradient: false },
//     gradient: {
//       linear: true,
//       radial: false,
//       color1: "#6a1a4c",
//       color2: "#6a1a4c",
//       rotation: "0",
//     },
//   },
//   cornersSquareOptions: { type: "extra-rounded", color: "#000000" },
//   cornersSquareOptionsHelper: {
//     colorType: { single: true, gradient: false },
//     gradient: {
//       linear: true,
//       radial: false,
//       color1: "#000000",
//       color2: "#000000",
//       rotation: "0",
//     },
//   },
//   cornersDotOptions: { type: "dot", color: "#000000" },
//   cornersDotOptionsHelper: {
//     colorType: { single: true, gradient: false },
//     gradient: {
//       linear: true,
//       radial: false,
//       color1: "#000000",
//       color2: "#000000",
//       rotation: "0",
//     },
//   },
//   backgroundOptionsHelper: {
//     colorType: { single: true, gradient: false },
//     gradient: {
//       linear: true,
//       radial: false,
//       color1: "#ffffff",
//       color2: "#ffffff",
//       rotation: "0",
//     },
//   },
// };
const useQRCodeStyling = (
  options: QRCodeStylingOptions
): QRCodeStyling | null => {
  //Only do this on the client
  if (typeof window !== "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const QRCodeStylingLib = require("qr-code-styling");
    const qrCodeStyling: QRCodeStyling = new QRCodeStylingLib(options);
    return qrCodeStyling;
  }
  return null;
};

const options: Options = {
  width: 300,
  height: 300,
  type: "svg" as DrawType,
  data: "http://qr-code-styling.com",
  image: "/favicon.ico",
  margin: 10,
  qrOptions: {
    typeNumber: 0 as TypeNumber,
    mode: "Byte" as Mode,
    errorCorrectionLevel: "Q" as ErrorCorrectionLevel,
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.4,
    margin: 20,
    crossOrigin: "anonymous",
  },
  dotsOptions: {
    color: "#222222",
    // gradient: {
    //   type: 'linear', // 'radial'
    //   rotation: 0,
    //   colorStops: [{ offset: 0, color: '#8688B2' }, { offset: 1, color: '#77779C' }]
    // },
    type: "rounded" as DotType,
  },
  backgroundOptions: {
    color: "#5FD4F3",
    // gradient: {
    //   type: 'linear', // 'radial'
    //   rotation: 0,
    //   colorStops: [{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
    // },
  },
  cornersSquareOptions: {
    color: "#222222",
    type: "extra-rounded" as CornerSquareType,
    // gradient: {
    //   type: 'linear', // 'radial'
    //   rotation: 180,
    //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
    // },
  },
  cornersDotOptions: {
    color: "#222222",
    type: "dot" as CornerDotType,
    // gradient: {
    //   type: 'linear', // 'radial'
    //   rotation: 180,
    //   colorStops: [{ offset: 0, color: '#00266e' }, { offset: 1, color: '#4060b3' }]
    // },
  },
};

const QrCodePage: React.FC<{ dataUrl: string }> = ({ dataUrl }) => {
  const [url, setUrl] = useState(dataUrl);
  const [fileExt, setFileExt] = useState<FileExtension | undefined>("png");
  // const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling(options));
  const qrCode = useQRCodeStyling(options);
  const ref = useRef<any>(null);
  useEffect(() => {
    qrCode?.append(ref.current);
  }, [ref, qrCode]);
  useEffect(() => {
    qrCode?.update({ data: url });
  }, [url, qrCode]);
  const onUrlChange: React.ChangeEventHandler<HTMLInputElement> | undefined = (
    event
  ) => {
    event.preventDefault();
    setUrl(event.target.value);
  };
  const onExtensionChange:
    | React.ChangeEventHandler<HTMLSelectElement>
    | undefined = (event) => {
    setFileExt(event.target.value as FileExtension);
  };
  const onDownloadClick = () => {
    qrCode?.download({ extension: fileExt });
  };
  return (
    <div className={Styles.container}>
      <div ref={ref} />
      <div className={Styles.container__bottom}>
        <button onClick={onDownloadClick}>Download</button>
        <img src="/assets/icons/vreel-powered.svg" alt="Powered By VReel" />
      </div>
    </div>
  );
};
export default QrCodePage;
