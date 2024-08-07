'use client';

import {
  modalDeleteEventDefault,
  modalKickUserDefault,
  modalLeaveGroupDefault,
  modalUpdateUserDefault,
} from '@/constants/modal-state';
import {
  modalDeleteEvent,
  modalKickUserInterface,
  modalLeaveGroup,
  modalUpdateUserInterface,
} from '@/interfaces/modal';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initialState {
  modalKickUser: modalKickUserInterface;
  modalUpdateUser: modalUpdateUserInterface;
  modalLeaveGroup: modalLeaveGroup;
  modalDeleteEvent: modalDeleteEvent;
}

const initialState: initialState = {
  modalKickUser: modalKickUserDefault,
  modalUpdateUser: modalUpdateUserDefault,
  modalLeaveGroup: modalLeaveGroupDefault,
  modalDeleteEvent: modalDeleteEventDefault,
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
    openModalDeleteEvent: (
      state,
      action: PayloadAction<modalDeleteEvent>
    ) => {
      state.modalDeleteEvent = action.payload;
    },

    closeModal: (state) => {
      state.modalKickUser = modalKickUserDefault;
      state.modalUpdateUser = modalUpdateUserDefault;
      state.modalLeaveGroup = modalLeaveGroupDefault;
      state.modalDeleteEvent = modalDeleteEventDefault;
    },
  },

  selectors: {
    openModalKickUserIsOpen: (state) => state.modalKickUser?.open,
    getKickUserData: (state) => state.modalKickUser,
    getUpdateUserData: (state) => state.modalUpdateUser,
    getLeaveGroupData: (state) => state.modalLeaveGroup,
    getDeleteEventData: (state) => state.modalDeleteEvent,
  },
});

export const {
  openModalKickUser,
  openModalUpdateUser,
  openModalLeaveGroup,
  openModalDeleteEvent,
  closeModal,
} = modalSlice.actions;

export const {
  openModalKickUserIsOpen,
  getKickUserData,
  getUpdateUserData,
  getLeaveGroupData,
  getDeleteEventData,
} = modalSlice.selectors;

export default modalSlice.reducer;
