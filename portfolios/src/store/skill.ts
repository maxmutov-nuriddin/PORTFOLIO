import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";


import Skill from "../types/skill";
import request from "../server";
import User from "../types/user";
import { LIMIT, USER } from "../constants";

interface SkillState {
  user: null | User;
  skills: Skill[];
  loading: boolean;
  total: number;
  page: number;
  isModalOpen: boolean;
  modalLoading: boolean;
  selected: null | string;
  search: string;
  getSkills: () => void;
  setPage: (page: number) => void;
  controlModal: (data: boolean) => void;
  setModalLoading: (data: boolean) => void;
  // showModal: (form: FormInstance) => void;
  setUser: (user: User) => void;
  setSelected: (selected: null | string) => void;
  setSearch: (search: string) => void;
}

const useSkill = create<SkillState>()(
  devtools(
    immer((set, get) => ({
      user: localStorage.getItem(USER)
        ? JSON.parse(localStorage.getItem(USER) || "")
        : null,
      skills: [],
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
        get().getSkills();
      },
      getSkills: async () => {
        try {
          set((state) => {
            state.loading = true;
          });
          const {
            data: { pagination, data },
          } = await request.get("skills", {
            params: {
              page: get().page,
              limit: LIMIT,
              search: get().search,
              user: "64dddfabdccb1b00143b2e85",
            },
            
          });
          set((state) => {
            state.skills = data;
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
        get().getSkills();
      },
      controlModal: (data) => {
        set((state) => {
          state.isModalOpen = data;
        });
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

export default useSkill;
