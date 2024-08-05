'use client';

import {
  modalKickUserDefault,
  modalLeaveGroupDefault,
  modalUpdateUserDefault,
} from '@/constants/modal-state';
import {
  modalKickUserInterface,
  modalLeaveGroup,
  modalUpdateUserInterface,
} from '@/interfaces/modal';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initialState {
  modalKickUser: modalKickUserInterface;
  modalUpdateUser: modalUpdateUserInterface;
  modalLeaveGroup: modalLeaveGroup;
}

const initialState: initialState = {
  modalKickUser: modalKickUserDefault,
  modalUpdateUser: modalUpdateUserDefault,
  modalLeaveGroup: modalLeaveGroupDefault,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModalKickUser: (
      state,
      action: PayloadAction<modalKickUserInterface>
    ) => {
      state.modalKickUser = action.payload;
    },
    openModalUpdateUser: (
      state,
      action: PayloadAction<modalUpdateUserInterface>
    ) => {
      state.modalUpdateUser = action.payload;
    },
    openModalLeaveGroup: (
      state,
      action: PayloadAction<modalLeaveGroup>
    ) => {
      state.modalLeaveGroup = action.payload;
    },

    closeModal: (state) => {
      state.modalKickUser = modalKickUserDefault;
      state.modalUpdateUser = modalUpdateUserDefault;
      state.modalLeaveGroup = modalLeaveGroupDefault;
    },
  },

  selectors: {
    openModalKickUserIsOpen: (state) => state.modalKickUser?.open,
    getKickUserData: (state) => state.modalKickUser,
    getUpdateUserData: (state) => state.modalUpdateUser,
    getLeaveGroupData: (state) => state.modalLeaveGroup,
  },
});

export const {
  openModalKickUser,
  closeModal,
  openModalUpdateUser,
  openModalLeaveGroup,
} = modalSlice.actions;

export const {
  openModalKickUserIsOpen,
  getKickUserData,
  getUpdateUserData,
  getLeaveGroupData,
} = modalSlice.selectors;

export default modalSlice.reducer;
