import React from "react";
import Links from "src/components/Shared/BottomSheet/Links/Links";
import BottomSheetContainer from "src/components/Shared/BottomSheet/BottomSheetContainer/BottomSheetContainer";
import ReactPageScroller from "react-page-scroller";
import VLinks from "src/components/Shared/BottomSheet/VLinks/VLinks/VLinks";
import Socials from "src/components/Shared/BottomSheet/Socials/Socials";
import Events from "src/components/Shared/BottomSheet/Events/Events";

export default function test() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <ReactPageScroller
        // pageOnChange={this.handlePageChange}
        // onBeforePageScroll={this.handleBeforePageChange}
        // customPageNumber={this.state.currentPage}
        containerHeight={"100vh"}
      >
        {[
          { Com: VLinks },
          { Com: Links },
          { Com: Socials },
          { Com: Events },
        ].map((Item, index) => (
          <div
            key={index}
            style={{
              background: "yellow",
              border: "1px solid red",
              width: "100vw",
              minHeight: "100vh",
              overflow: "hidden",
            }}
          >
            <Item.Com setOpen={() => {}} />
          </div>
        ))}
      </ReactPageScroller>
    </div>
  );
}

// https://github.com/nygardk/react-share/blob/master/demo/Demo.tsx
