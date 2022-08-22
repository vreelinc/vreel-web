import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling, {
  Options as QRCodeStylingOptions,
  FileExtension,
} from 'qr-code-styling';
import Styles from './QRCodePage.module.scss';

const qrOptions: QRCodeStylingOptions = {
  width: 300,
  height: 300,
  data: 'www.facebook.com',
  margin: 10,
  qrOptions: {
    mode: 'Byte',
    errorCorrectionLevel: 'Q',
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.4,
    margin: 10,
  },
  dotsOptions: { type: 'square', color: '#000000', gradient: null },
  backgroundOptions: { color: '#ffffff' },
  image:
    'https://res.cloudinary.com/klwebco/image/upload/v1655087042/Frame_50254_ag47l8.png',

  dotsOptionsHelper: {
    colorType: { single: true, gradient: false },
    gradient: {
      linear: true,
      radial: false,
      color1: '#6a1a4c',
      color2: '#6a1a4c',
      rotation: '0',
    },
  },
  cornersSquareOptions: { type: 'square', color: '#000000' },
  cornersSquareOptionsHelper: {
    colorType: { single: true, gradient: false },
    gradient: {
      linear: true,
      radial: false,
      color1: '#000000',
      color2: '#000000',
      rotation: '0',
    },
  },
  cornersDotOptions: { type: '', color: '#000000' },
  cornersDotOptionsHelper: {
    colorType: { single: true, gradient: false },
    gradient: {
      linear: true,
      radial: false,
      color1: '#000000',
      color2: '#000000',
      rotation: '0',
    },
  },
  backgroundOptionsHelper: {
    colorType: { single: true, gradient: false },
    gradient: {
      linear: true,
      radial: false,
      color1: '#ffffff',
      color2: '#ffffff',
      rotation: '0',
    },
  },
};
const useQRCodeStyling = (
  options: QRCodeStylingOptions
): QRCodeStyling | null => {
  //Only do this on the client
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const QRCodeStylingLib = require('qr-code-styling');
    const qrCodeStyling: QRCodeStyling = new QRCodeStylingLib(options);
    return qrCodeStyling;
  }
  return null;
};
const QrCodePage: React.FC<{ dataUrl: string }> = ({ dataUrl }) => {
  const [url, setUrl] = useState(dataUrl);
  const [fileExt, setFileExt] = useState<FileExtension | undefined>('png');
  const qrCode = useQRCodeStyling(qrOptions);
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
        <img src='/assets/icons/vreel-powered.svg' alt='Powered By VReel' />
      </div>
    </div>
  );
};
export default QrCodePage;
