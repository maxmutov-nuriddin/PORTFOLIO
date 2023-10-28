import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { FormInstance } from "antd";


import Expiriens from "../types/expiriens";
import request from "../server";
import User from "../types/user";
import { LIMIT, USER } from "../constants";

interface ExpiriensState {
  user: null | User;
  expiriens: Expiriens[];
  loading: boolean;
  total: number;
  page: number;
  isModalOpen: boolean;
  modalLoading: boolean;
  selected: null | string;
  search: string;
  getExpiriens: () => void;
  setPage: (page: number) => void;
  controlModal: (data: boolean) => void;
  showModal: (form: FormInstance) => void;
  setModalLoading: (data: boolean) => void;
  setUser: (user: User) => void;
  setSelected: (selected: null | string) => void;
  setSearch: (search: string) => void;
}

const userId = localStorage.getItem("PORTFOLIO_USER")
  ? JSON.parse(localStorage.getItem("PORTFOLIO_USER") || "")
  : null;

const useExpiriens = create<ExpiriensState>()(

  devtools(
    immer((set, get) => ({
      user: localStorage.getItem(USER)
        ? JSON.parse(localStorage.getItem(USER) || "")
        : null,
      expiriens: [],
      loading: false,
      isModalOpen: false,
      modalLoading: false,
      selected: null,
      total: 0,
      page: 1,
      search: "",
      setSearch: (search) => {
        set((state) => {
          state.search = search;
        });
        get().getExpiriens();
      },
      getExpiriens: async () => {
        try {
          set((state) => {
            state.loading = true;
          });
          const {
            data: { pagination, data },
          } = await request.get(`experiences`, {
            params: {
              page: get().page,
              limit: LIMIT,
              search: get().search,
              user: userId._id,
            },

          });
          set((state) => {
            state.expiriens = data;
            state.total = pagination.total;
            state.loading = false;
          });
        } finally {
          set((state) => {
            state.loading = false;
          });
        }
      },
      setPage: (page) => {
        set((state) => {
          state.page = page;
        });
        get().getExpiriens();
      },
      controlModal: (data) => {
        set((state) => {
          state.isModalOpen = data;
        });
      },
      showModal: (form) => {
        get().controlModal(true);
        get().setSelected(null);
        form.resetFields();
      },
      setModalLoading: (data) => {
        set((state) => {
          state.modalLoading = data;
        });
      },
      setUser: (user) => {
        set((state) => {
          state.user = user;
        });
      },
      setSelected: (selected) => {
        set((state) => {
          state.selected = selected;
        });
      },
    }))
  )
);

export default useExpiriens;
