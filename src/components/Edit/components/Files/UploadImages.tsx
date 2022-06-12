const React = require('react');
const Uppy = require('@uppy/core');
const Tus = require('@uppy/tus');
const GoogleDrive = require('@uppy/google-drive');
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
const { Dashboard } = require('@uppy/react');
const Dropbox = require('@uppy/dropbox');
const Instagram = require('@uppy/instagram');
const Url = require('@uppy/url');
const Webcam = require('@uppy/webcam');

const UploadImages = ({ refetch }) => {
  const [cookies] = useCookies(['userAuthToken']);

  const uppy = new Uppy({ id: 'uppy', autoProceed: false, debug: true })
    .use(Tus, {
      endpoint: process.env.NEXT_PUBLIC_MEDIA_BASE_URL,
      headers: {
        token: cookies['userAuthToken'],
        'Access-Control-Allow-Origin': 'http://localhost:7070',
        'Access-Control-Allow-Headers': '*',
        // "Access-Control-Request-Headers": "*"
      },
      removeFingerprintOnSuccess: true,
    })
    .use(GoogleDrive, { companionUrl: 'https://companion.uppy.io' })
    .use(Dropbox, { companionUrl: 'https://companion.uppy.io' })
    .use(Instagram, { companionUrl: 'https://companion.uppy.io' })
    .use(Url, { companionUrl: 'https://companion.uppy.io' })
    .use(Webcam, {
      mirror: true,
      facingMode: "user",
      showRecordingLength: true,
    });

  uppy.on('complete', (result) => {
    refetch();
    result.successful.map((res) => {
      toast.success(`Upload ${res.type} successfully`);
    });
  });

  return (
    <div style={{ color: 'black' }}>
      <Dashboard
        uppy={uppy}
        plugins={['GoogleDrive', 'Dropbox', 'Instagram', 'Url', 'Webcam']}
        metaFields={[{ id: 'name', name: 'Name', placeholder: 'File name' }]}
      />
    </div>
  );
};

export default UploadImages;
