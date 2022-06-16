import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  vLinksModalInit : false,
  eventsModalInit:false,
  vLinksInit:false,
  eventsInit:false,
  socialsInit:false,
  contributeInit:false,
  musicLinksInit:false,
  videoInit:false,
  imagesInit:false,
  bottomSheetInit:false,
  findItem:{id:0,thumbnail:"",link_header:"",link_sub_header:""},
}

export const vLinksActions = createSlice({
  name: 'bottomSheet',
  initialState,
  reducers: {
    openVlinksModal: (state) =>{
      state.vLinksModalInit = !state.vLinksModalInit;
    },
    openEventsModal:(state)=>{
      state.eventsModalInit = !state.eventsModalInit;
    },
    openVLinks:(state,actions)=>{
      state.vLinksInit = actions.payload;
    },
    openSocials:(state,actions)=>{
      state.socialsInit = actions.payload;
      console.log({socialsInit:state.socialsInit});
      
    },
    openEvents:(state,actions)=>{
      state.eventsInit = actions.payload;
    },
    openContribute:(state,actions)=>{
      state.contributeInit = actions.payload;
    },
    openMusicLinks:(state,actions)=>{
      state.musicLinksInit = actions.payload;
    },
    openVideo : (state,actions) =>{
      state.videoInit = actions.payload;
    },
    openImages : (state,actions) =>{
      state.imagesInit = actions.payload;
    },
    getIdActions:(state,actions)=>{
        state.findItem = actions.payload;
    },
    openBottomSheet:(state,actions)=>{
      state.bottomSheetInit = actions.payload;
    }
  }
})


export const {openVlinksModal,getIdActions,openBottomSheet,openEventsModal,openVLinks,openSocials,
  openEvents,openContribute,openMusicLinks,openVideo,openImages} = vLinksActions.actions;
export default vLinksActions.reducer;