import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { FormInstance } from "antd";


import Message from "../types/message";
import request from "../server";
import User from "../types/user";
import { LIMIT, USER } from "../constants";

interface MessageState {
  users: null | User;
  messages: Message[];
  loading: boolean;
  total: number;
  page: number;
  isModalOpen: boolean;
  modalLoading: boolean;
  selected: null | string;
  search: string;
  getMessage: () => void;
  setPage: (page: number) => void;
  controlModal: (data: boolean) => void;
  showModal: (form: FormInstance) => void;
  setModalLoading: (data: boolean) => void;
  setUser: (users: User) => void;
  setSelected: (selected: null | string) => void;
  setSearch: (search: string) => void;
}

const userId = localStorage.getItem("PORTFOLIO_USER")
  ? JSON.parse(localStorage.getItem("PORTFOLIO_USER") || "")
  : null;

const useMessage = create<MessageState>()(

  devtools(
    immer((set, get) => ({
      users: localStorage.getItem(USER)
        ? JSON.parse(localStorage.getItem(USER) || "")
        : null,
      messages: [],
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
        get().getMessage();
      },
      getMessage: async () => {
        try {
          set((state) => {
            state.loading = true;
          });

          interface Params {
            page: number;
            limit: number;
            search: string;
            user?: string;
          }

          const params: Params = {
            page: get().page,
            limit: LIMIT,
            search: get().search,
          };

          if (userId.role !== "admin") {
            params.user = userId._id;
          }

          const {
            data: { pagination, data },
          } = await request.get(`messages`, { params });
          set((state) => {
            state.messages = data;
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
        get().getMessage();
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
      setUser: (users) => {
        set((state) => {
          state.users = users;
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

export default useMessage;
