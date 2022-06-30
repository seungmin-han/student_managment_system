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

// MainPage vue example
// import { useMemberStore } from "../store/member";
// export default {
//     name: "AddPage",
//     components: {},
//     setup() {
//         const memberStore = useMemberStore();

//         memberStore.addMember("이준용");
//         memberStore.addMember("한승민");

//         const members = memberStore.getAll;

//         const addMember = () => {
//             console.log("멤버 추가!");
//         };
//         return { members, addMember };
//     },
// };
