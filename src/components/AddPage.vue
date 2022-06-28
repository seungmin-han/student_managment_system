<template>
    <h1>연합을 생성해봐요</h1>
    <div class="wrap addBox">
        <div class="form">
            <h2>연합 정보 영역</h2>
            <input type="text" placeholder="연합 이름을 입력해주세요." />
            <input type="text" placeholder="연합 주소를 입력해주세요." />
        </div>
        <div class="form">
            <h2>멤버 영역</h2>
            <div class="mInfo">
                <p>대장</p>
                <p>:</p>
                <div class="nameList">
                    <span v-if="state.leader != ''" @click="delMember(0)">{{
                        state.leader
                    }}</span>
                </div>
            </div>
            <div class="mInfo">
                <p>부대장</p>
                <p>:</p>
                <div class="nameList">
                    <span
                        v-for="(commander, index) in state.commander"
                        @click="delMember(1, index)"
                        :key="index"
                        >{{ commander }}
                    </span>
                </div>
            </div>
            <div class="mInfo">
                <p>말단</p>
                <p>:</p>
                <div class="nameList">
                    <span
                        v-for="(staff, index) in state.staff"
                        @click="delMember(2, index)"
                        :key="index"
                        >{{ staff }}
                    </span>
                </div>
            </div>
            <div class="commitForm">
                <p>대장 : 1명 ( 필수 )</p>
                <input
                    type="text"
                    placeholder="대장 이름"
                    @keyup.enter="addMember(0)"
                    v-model="txt.leader"
                />
                <p>부대장 : 최대 7 명</p>
                <input
                    type="text"
                    placeholder="부대장 이름"
                    @keyup.enter="addMember(1)"
                    v-model="txt.commander"
                />
                <p>말단 : 제한 없음</p>
                <input
                    type="text"
                    placeholder="말단 이름"
                    @keyup.enter="addMember(2)"
                    v-model="txt.staff"
                />
            </div>
        </div>
        <div class="mBox">
            <div class="members" @click="addMember()">+</div>
            <div v-for="(member, key) in members" :key="key">
                {{ member }}
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from "vue";
export default {
    name: "AddPage",
    components: {},
    setup() {
        const txt = reactive({
            leader: "",
            commander: "",
            staff: "",
        });

        const state = reactive({
            leader: "",
            commander: [],
            staff: [],
        });

        const addMember = (type) => {
            if (type == 0) {
                if (state.leader == "") {
                    state.leader = txt.leader;
                    txt.leader = "";
                } else {
                    console.log("대장 있음");
                }
            } else if (type == 1) {
                if (state.commander.length < 8) {
                    state.commander.push(txt.commander);
                    txt.commander = "";
                } else {
                    console.log("부대장 7명 넘음");
                }
            } else {
                state.staff.push(txt.staff);
                txt.staff = "";
            }
        };

        const delMember = (type, index = null) => {
            if (type == 0) {
                state.leader = "";
            } else if (type == 1) {
                state.commander.splice(index, 1);
            } else {
                state.staff.splice(index, 1);
            }
        };
        return { txt, state, addMember, delMember };
    },
};
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
