import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { BottomSheet } from "react-spring-bottom-sheet";

// if setting up the CSS is tricky, you can add this to your page somewhere:
// <link rel="stylesheet" href="https://unpkg.com/react-spring-bottom-sheet/dist/style.css" crossorigin="anonymous">
import "react-spring-bottom-sheet/dist/style.css";
import {
  expandVLinks,
  openBottomSheet,
} from "src/redux/createSlice/bottomSheetSlice";
import { RootState, useAppDispatch } from "src/redux/store/store";
import Events from "../Events/Events";
import Links from "../Links/Links";
import Socials from "../Socials/Socials";
import VLinks from "../VLinks/VLinks/VLinks";
import VLinksReadModal from "../VLinks/VLinksReadModal/VLinksReadModal";

export default function NestedSheet() {
  const { bottomSheetInit, vLinksModalInit, eventsModalInit } = useSelector(
    (state: RootState) => state.bottomSheet
  );
  const dispatch = useAppDispatch();

  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  console.log(open3);

  return (
    <>
      <BottomSheet
        open={bottomSheetInit}
        onDismiss={() => dispatch(openBottomSheet(false))}
        expandOnContentDrag={true}
        snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight]}
        defaultSnap={({ lastSnap, snapPoints }) => 500}
        sibling={
          <div>
            <BottomSheet
              open={open2}
              onDismiss={() => setOpen2(false)}
              expandOnContentDrag={true}
              snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight]}
              defaultSnap={({ lastSnap, snapPoints }) => 500}
              onSpringStart={async (event) => {
                if (event.type === "CLOSE") {
                  setOpen2(false);
                }
              }}
              sibling={
                <BottomSheet
                  open={vLinksModalInit ? vLinksModalInit : open3}
                  onDismiss={open3 && (() => setOpen3(false))}
                  expandOnContentDrag={true}
                  snapPoints={({ minHeight, maxHeight }) => [
                    minHeight,
                    maxHeight,
                  ]}
                  defaultSnap={({ lastSnap, snapPoints }) => 500}
                  sibling={
                    <BottomSheet
                      open={open4}
                      onDismiss={() => setOpen4(false)}
                      expandOnContentDrag={true}
                      snapPoints={({ minHeight, maxHeight }) => [
                        minHeight,
                        maxHeight,
                      ]}
                      defaultSnap={({ lastSnap, snapPoints }) => 500}
                      sibling={
                        <BottomSheet
                          open={eventsModalInit}
                          // onDismiss={() => setOpen4(false)}
                          expandOnContentDrag={true}
                          snapPoints={({ minHeight, maxHeight }) => [
                            minHeight,
                            maxHeight,
                          ]}
                          defaultSnap={({ lastSnap, snapPoints }) => 500}
                          // sibling={}
                        >
                          <VLinksReadModal />
                        </BottomSheet>
                      }
                    >
                      <Events setOpen={setOpen4} />
                    </BottomSheet>
                  }
                >
                  {vLinksModalInit ? (
                    <VLinksReadModal />
                  ) : (
                    <Socials setOpen={setOpen4} />
                  )}
                </BottomSheet>
              }
            >
              <VLinks setOpen={setOpen3} />
            </BottomSheet>
          </div>
        }
      >
        <Links setOpen={setOpen2} />
      </BottomSheet>
    </>
  );
}
