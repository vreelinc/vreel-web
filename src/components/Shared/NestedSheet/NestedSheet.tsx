import { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";

// if setting up the CSS is tricky, you can add this to your page somewhere:
// <link rel="stylesheet" href="https://unpkg.com/react-spring-bottom-sheet/dist/style.css" crossorigin="anonymous">
import "react-spring-bottom-sheet/dist/style.css";
import Events from "../Events/Events";
import Links from "../Links/Links";
import Socials from "../Socials/Socials";
import VLinks from "../VLinks/VLinks/VLinks";

export default function NestedSheet() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <BottomSheet
        open={open}
        onDismiss={() => setOpen(false)}
        expandOnContentDrag={true}
        snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight]}
        defaultSnap={({ lastSnap, snapPoints }) => 500}
        sibling={
          <div
            style={{
              border: "1px solid red",
            }}
          >
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
                  open={open3}
                  onDismiss={() => setOpen3(false)}
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
                      // sibling={}
                    >
                      <Events setOpen={() => {}} />
                      <button onClick={() => setOpen4(true)}>
                        Click to expand Connects
                      </button>
                    </BottomSheet>
                  }
                >
                  <Socials setOpen={setOpen4} />
                  <button onClick={() => setOpen4(true)}>
                    Click to expand Events
                  </button>
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
