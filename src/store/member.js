import { defineStore } from "pinia";

export const useMemberStore = defineStore("member", {
    state: () => {
        return { list: [] };
    },
    actions: {
        addMember(name) {
            this.list.push(name);
        },
        delMember(index) {
            this.list.splice(index, 1);
        },
        printName(index) {
            return this.list[index];
        },
    },
    getters: {
        getCount: (state) => state.list.length,
        getAll: (state) => state.list,
    },
});
