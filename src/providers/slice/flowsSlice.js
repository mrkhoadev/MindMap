import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mindMapList: [],
  checkAll: false,
  isSelected: false,
  flowDetails: {},
  isLoading: true,
};
const flowsSlice = createSlice({
  name: "flowsSlice",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setMindMapList: (state, action) => {
      state.mindMapList = action.payload;
      state.isLoading = false;
    },
    deleteMindMap: (state, action) => {
      const deletedId = action.payload;
      const newData = state.mindMapList.map(
        (item) => {
          if (item.id === deletedId)
          {
            return null;
          }
          return item;
        }
      ).filter((i) => i);
      state.mindMapList = newData;
      state.isLoading = false;
    },
    deleteSelectedMindMap: (state, action) => {
      const newMindMapList = state.mindMapList.map(
        (item) => {
          if (item.selected)
          {
            return null;
          }
          return item
        }
      ).filter((i) => i);
      state.mindMapList = newMindMapList;
      state.isLoading = false;
      state.checkAll = false;
      state.isSelected = false;
    },
    changeSelectedGroup: (state, action) => {
      state.mindMapList = state.mindMapList.map((flow) => {
        if (flow) {
          if (action.payload.id === 'all') {
            return {...flow, selected: !state.checkAll}
          } else {
            if (flow.id === action.payload.id) {
              return {...flow, selected: action.payload.selected}
            }
            return flow;
          }
        }
        return null
      }).filter((i) => i);
      const isCheckAll = state.mindMapList.every((item) => item.selected);
      const isSelected = state.mindMapList.some((item) => item.selected);
      state.checkAll = isCheckAll;
      state.isSelected = isSelected;
    },
    setStatusCheckbox: (state, action) => {
      state.isSelected = action.payload.isSelected;
      state.checkAll = action.payload.checkAll;
    },
    setFlowDetails: (state, action) => {
      state.flowDetails = action.payload;
      state.isLoading = false;
    }
  },
});
export const { 
                setIsLoading,
                deleteMindMap,
                setMindMapList, 
                setFlowDetails, 
                setStatusCheckbox,
                changeSelectedGroup,
                deleteSelectedMindMap,
              } 
                = flowsSlice.actions

export default flowsSlice;
