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
        return data
    }
)

const editorSlice = createSlice({
    name: "editor",
    initialState: {
        currentPageId: null,
        pages: []
    },
    reducers: {
        setCurrentPageId(state, { payload }) {
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
            console.log("creation result", action.payload)
        })
    }
})

export const { setCurrentPageId, setEditorPages } = editorSlice.actions
export default editorSlice.reducer