import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { FormInstance } from "antd";


import Portfolio from "../types/portfolio";
import request from "../server";
import User from "../types/user";
import { LIMIT, USER } from "../constants";

interface PortfolioState {
  user: null | User;
  portfolio: Portfolio[];
  loading: boolean;
  total: number;
  page: number;
  isModalOpen: boolean;
  modalLoading: boolean;
  selected: null | string;
  search: string;
  getPortfolio: () => void;
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

const usePortfolio = create<PortfolioState>()(

  devtools(
    immer((set, get) => ({
      user: localStorage.getItem(USER)
        ? JSON.parse(localStorage.getItem(USER) || "")
        : null,
      portfolio: [],
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
        get().getPortfolio();
      },
      getPortfolio: async () => {
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
          } = await request.get(`portfolios`, { params });
          
          set((state) => {
            state.portfolio = data;
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
        get().getPortfolio();
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

export default usePortfolio;
