import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  vLinksModalInit : false,
  eventsModalInit:false,
  vLinksInit:false,
  eventsInit:false,
  socialsInit:false,
  contactInit:false,
  bottomSheetInit:false,
  findItem:{id:0,type:''},
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
    },
    openEvents:(state,actions)=>{
      state.eventsInit = actions.payload;
    },
    openConnects:(state,actions)=>{
      state.contactInit = actions.payload;
    },
    getIdActions:(state,actions)=>{
        state.findItem = actions.payload;
    },
    openBottomSheet:(state,actions)=>{
      state.bottomSheetInit = actions.payload;
    }
  }
})


export const {openVlinksModal,getIdActions,openBottomSheet,openEventsModal,openVLinks,openSocials,openEvents,openConnects} = vLinksActions.actions;
export default vLinksActions.reducer;