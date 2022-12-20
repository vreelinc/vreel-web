import { client } from "@graphql/index"
import { CREATE_PAGE } from "@graphql/mutations"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const createPage = createAsyncThunk(`editor/createPage`,
    async (payload: any, thunkAPI: any) => {
        // const { account_type } = thunkAPI.getState().auth.flow
        const { data, errors } = await client.mutate({
            mutation: CREATE_PAGE,
            variables: {
                token: payload
            }
        })
        console.log(errors, data)
        return data
    }
)

const editorSlice = createSlice({
    name: "editor",
    initialState: {
        currentPageId: null,
        pages: [],
        editTrigger: 0
    },
    reducers: {
        triggerGlobalEdit(state) {
            alert("trigger")
            return { ...state, editTriger: state.editTrigger + 1 }
        },
        resetEditTrigger(state) {
            return { ...state, editTrigger: 0 }
        },
        setCurrentPageId(state, { payload }) {
            alert("setting page id" + payload)
            state.currentPageId = payload
        },
        setEditorPages(state, { payload }) {
            state.pages = payload
            state.currentPageId = payload[0].id
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(createPage.fulfilled, (state, action) => {
            // state.pages.push(action)
        })
    }
})

export const { setCurrentPageId, setEditorPages, resetEditTrigger, triggerGlobalEdit } = editorSlice.actions
export default editorSlice.reducer