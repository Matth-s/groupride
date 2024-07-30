'use client';

import {
  modalKickUserInterface,
  modalUpdateUserInterface,
} from '@/interfaces/modal';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initialState {
  modalKickUser: modalKickUserInterface;
  modalUpdateUser: modalUpdateUserInterface;
}

const modalKickUserDefault: modalKickUserInterface = {
  open: false,
  userIdToKick: '',
  usernameToKick: '',
  groupId: '',
};

const modalUpdateUserDefault: modalUpdateUserInterface = {
  open: false,
  userIdToUpdate: '',
  usernameToUpdate: '',
  groupId: '',
};

const initialState: initialState = {
  modalKickUser: {
    open: false,
    userIdToKick: '',
    groupId: '',
    usernameToKick: '',
  },
  modalUpdateUser: {
    open: false,
    userIdToUpdate: '',
    groupId: '',
    usernameToUpdate: '',
  },
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
    closeModal: (state) => {
      state.modalKickUser = modalKickUserDefault;
      state.modalUpdateUser = modalUpdateUserDefault;
    },
  },

  selectors: {
    openModalKickUserIsOpen: (state) => state.modalKickUser?.open,
    getKickUserData: (state) => state.modalKickUser,
    getUpdateUserData: (state) => state.modalUpdateUser,
  },
});

export const { openModalKickUser, closeModal, openModalUpdateUser } =
  modalSlice.actions;

export const {
  openModalKickUserIsOpen,
  getKickUserData,
  getUpdateUserData,
} = modalSlice.selectors;

export default modalSlice.reducer;
