import React from "react";
import { useSelector } from "react-redux";
import { BottomSheet } from "react-spring-bottom-sheet";

// if setting up the CSS is tricky, you can add this to your page somewhere:
// <link rel="stylesheet" href="https://unpkg.com/react-spring-bottom-sheet/dist/style.css" crossorigin="anonymous">
import "react-spring-bottom-sheet/dist/style.css";
import {
  openBottomSheet,
  openEvents,
  openSocials,
  openVLinks,
} from "src/redux/createSlice/bottomSheetSlice";
import { RootState, useAppDispatch } from "src/redux/store/store";
import Events from "../Events/Events";
import Links from "../Links/Links";
import Socials from "../Socials/Socials";
import VLinks from "../VLinks/VLinks/VLinks";
import VLinksReadModal from "../VLinks/VLinksReadModal/VLinksReadModal";

export default function NestedSheet() {
  const {
    bottomSheetInit,
    vLinksModalInit,
    eventsModalInit,
    eventsInit,
    socialsInit,
    vLinksInit,
  } = useSelector((state: RootState) => state.bottomSheet);
  const dispatch = useAppDispatch();

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
              open={vLinksInit}
              onDismiss={() => dispatch(openVLinks(false))}
              expandOnContentDrag={true}
              snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight]}
              defaultSnap={({ lastSnap, snapPoints }) => 500}
              onSpringStart={async (event) => {
                if (event.type === "CLOSE") {
                  dispatch(openVLinks(false));
                }
              }}
              sibling={
                <BottomSheet
                  open={socialsInit}
                  onDismiss={() => dispatch(openSocials(false))}
                  expandOnContentDrag={true}
                  snapPoints={({ minHeight, maxHeight }) => [
                    minHeight,
                    maxHeight,
                  ]}
                  defaultSnap={({ lastSnap, snapPoints }) => 500}
                  sibling={
                    <BottomSheet
                      open={eventsInit}
                      onDismiss={() => dispatch(openEvents(false))}
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
                      <Events />
                    </BottomSheet>
                  }
                >
                  <Socials />
                </BottomSheet>
              }
            >
              <VLinks />
            </BottomSheet>
          </div>
        }
      >
        <Links />
      </BottomSheet>
    </>
  );
}
