import React from "react";
import { useSelector } from "react-redux";
import { BottomSheet } from "react-spring-bottom-sheet";

// if setting up the CSS is tricky, you can add this to your page somewhere:
// <link rel="stylesheet" href="https://unpkg.com/react-spring-bottom-sheet/dist/style.css" crossorigin="anonymous">
import "react-spring-bottom-sheet/dist/style.css";
import {
  openBottomSheet,
  openContribute,
  openEvents,
  openMusicLinks,
  openSocials,
  openVLinks,
} from "src/redux/createSlice/bottomSheetSlice";
import { RootState, useAppDispatch } from "src/redux/store/store";
import Contribute from "../Contribute/Contribute";
import Events from "../Events/Events";
import Links from "../Links/Links";
import MusicLinks from "../MusicLinks/MusicLinks";
import Socials from "../Socials/Socials";
import VLinks from "../VLinks/VLinks/VLinks";
import VLinksReadModal from "../VLinks/VLinksReadModal/VLinksReadModal";

export default function NestedSheet() {
  const {
    bottomSheetInit,
    eventsInit,
    socialsInit,
    vLinksInit,
    contributeInit,
    musicLinksInit,
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
                          open={contributeInit}
                          onDismiss={() => dispatch(openContribute(false))}
                          expandOnContentDrag={true}
                          snapPoints={({ minHeight, maxHeight }) => [
                            minHeight,
                            maxHeight,
                          ]}
                          defaultSnap={({ lastSnap, snapPoints }) => 500}
                          sibling={
                            <BottomSheet
                              open={musicLinksInit}
                              onDismiss={() => dispatch(openMusicLinks(false))}
                              expandOnContentDrag={true}
                              snapPoints={({ minHeight, maxHeight }) => [
                                minHeight,
                                maxHeight,
                              ]}
                              defaultSnap={({ lastSnap, snapPoints }) => 500}
                              // sibling={}
                            >
                              <MusicLinks />
                            </BottomSheet>
                          }
                        >
                          <Contribute />
                        </BottomSheet>
                      }
                    >
                      <Socials />
                    </BottomSheet>
                  }
                >
                  <Events />
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
