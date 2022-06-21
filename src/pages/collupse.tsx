import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Collapse from 'src/components/Shared/Collapse/Collapse';
import AccountMenu from 'src/components/Shared/Menu/AccountMenu/AccountMenu';
import GeneralMenu from 'src/components/Shared/Menu/GeneralMenu/GeneralMenu';
import { RootState, useAppDispatch } from 'src/redux/store/store';

export default function collupse() {
  // console.log(topHeight, middleHeight, bottomHeight);
  const [heights, setHeights] = useState([]);
  return (
    <>
      {/* <Slides /> */}
      {/* <EditFiles /> */}
      {/* <GeneralMenu /> */}
      {/* <AccountMenu /> */}
      {/* <Collapse title={`Slides_${e}`} level={1}></Collapse> */}
      {[1].map((e) => (
        <Collapse title={`Slides_${e}`} level={1}>
          {[1, 2].map((e2) => (
            <Collapse
              title={`Slides_${e}.${e2}`}
              level_1={`Slides_${e}`}
              level={2}
            >
              {[1].map((e3) => (
                <Collapse
                  title={`Slides_${e}.${e2}.${e3}`}
                  level_1={`Slides_${e}`}
                  level_2={`Slides_${e}.${e2}`}
                  level={3}
                ></Collapse>
              ))}
            </Collapse>
          ))}
        </Collapse>
      ))}
    </>
  );
}
