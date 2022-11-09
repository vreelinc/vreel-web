import { useEffect, useRef, useState } from "react";

export default function PDFViewer() {
  const [kit, setKit] = useState();
  const containerRef = useRef(null);

  return (
    <div>
      <object
        data="https://vreel-storage.nyc3.cdn.digitaloceanspaces.com/amarsh/images/LADA_Clickers_Post-Activity11%20%283%29.pdf"
        type="application/pdf"
        width="100%"
        height="100%"
      >
        <a>Hello World!</a>
      </object>
    </div>
  );
}
