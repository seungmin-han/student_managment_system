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
                    v-bind:disabled="state.leader != ''"
                />
                <p>부대장 : 최대 7 명</p>
                <input
                    type="text"
                    placeholder="부대장 이름"
                    @keyup.enter="addMember(1)"
                    v-model="txt.commander"
                    v-bind:disabled="state.commander.length > 6"
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
        <div class="form">
            <h2>일정 영역</h2>
            <div class="btnBox">
                <button @click="showGroupModal({ type: 'add' })">
                    그룹 추가
                </button>
                <ModalGroupAdd ref="modalGroupAdd" :content="addContent" />
                <ModalGroupDelete
                    ref="modalGroupDelete"
                    :content="deleteContent"
                />
                <ModalGroupEdit ref="modalGroupEdit" :content="editContent" />
            </div>
            <div class="groupBox">
                <GroupView
                    :parentGroup="state.group"
                    :childGroup="state.group"
                    :parentNames="''"
                    @showGroupModal="showGroupModal"
                ></GroupView>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from "vue";
import ModalGroupAdd from "../teleport/ModalGroupAdd.vue";
import ModalGroupDelete from "../teleport/ModalGroupDelete.vue";
import ModalGroupEdit from "../teleport/ModalGroupEdit.vue";
import GroupView from "./GroupView.vue";
export default {
    name: "AddPage",
    components: { ModalGroupAdd, ModalGroupDelete, ModalGroupEdit, GroupView },
    setup() {
        const modalGroupAdd = ref();
        const addContent = ref("");

        const modalGroupDelete = ref();
        const deleteContent = ref("");

        const modalGroupEdit = ref();
        const editContent = ref("");

        const txt = reactive({
            leader: "",
            commander: "",
            staff: "",
        });

        const state = reactive({
            leader: "",
            commander: [],
            staff: [],
            group: [],
        });

        const addMember = (type) => {
            if (type == 0) {
                state.leader = txt.leader;
                txt.leader = "";
            } else if (type == 1) {
                state.commander.push(txt.commander);
                txt.commander = "";
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

        const groupAdd = async (target = null) => {
            // 루트, 서브그룹 추가 모달
            const ok = await modalGroupAdd.value.show();
            if (!ok) {
                // cancle
                return;
            }

            if (target === null) {
                // rootGroup Add
                state.group.push({ name: ok, sub: [] });
            } else {
                // subGroup Add
                target.sub.push({ name: ok, sub: [] });
            }
        };

        const groupDelete = async (target, index) => {
            // 루트, 서브그룹 삭제 모달
            const ok = await modalGroupDelete.value.show();
            if (!ok) {
                // cancle
                return;
            }
            target.splice(index, 1);
        };

        const groupEdit = async (target, index) => {
            // 루트, 서브그룹 수정 모달
            const ok = await modalGroupEdit.value.show();
            if (!ok) {
                // cancle
                return;
            }
            target[index].name = ok;
        };

        const showGroupModal = ({ type, target = null, index = null }) => {
            if (type == "add") {
                // 루트, 서브 그룹추가 모달 show
                addContent.value =
                    target === null
                        ? "그룹 추가"
                        : `${target.name}의 서브그룹 추가`;
                groupAdd(target);
            } else if (type == "delete") {
                // 루트, 서브 그룹삭제 모달 show
                if (target.sub) {
                    deleteContent.value = target.sub[index].name;
                    target = target.sub;
                } else {
                    deleteContent.value = target[index].name;
                }

                groupDelete(target, index);
            } else if (type == "edit") {
                // 루트, 서브 그룹수정 모달 show
                if (target.sub) {
                    editContent.value = target.sub[index].name;
                    target = target.sub;
                } else {
                    editContent.value = target[index].name;
                }

                groupEdit(target, index);
            }
        };

        return {
            modalGroupAdd,
            addContent,
            modalGroupDelete,
            deleteContent,
            modalGroupEdit,
            editContent,
            groupAdd,
            groupDelete,
            groupEdit,
            txt,
            state,
            addMember,
            delMember,
            showGroupModal,
        };
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
