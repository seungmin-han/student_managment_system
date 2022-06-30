<template>
    <ModalBase ref="baseModal">
        <div class="content-container">
            <h2>{{ content }}그룹의 일정 추가</h2>
            <div class="groupForm">
                <input
                    type="date"
                    v-model="dateValue"
                    min="2022-01-01"
                    max="2022-12-31"
                    id="testDate"
                />
                <input
                    type="text"
                    v-model="txtCalName"
                    placeholder="일정 제목을 입력해주세요"
                />
            </div>
        </div>
        <div class="buttons-container">
            <span>
                <button class="btn confirm" @click="add">추가</button>
                <button class="btn cancel" @click="cancel">취소</button>
            </span>
        </div>
    </ModalBase>
</template>

<script>
import ModalBase from "./ModalBase.vue";
import { ref } from "vue";

export default {
    name: "ModalCalAdd",
    components: {
        ModalBase,
    },

    props: {
        content: String,
    },
    setup(props) {
        const baseModal = ref(null);
        const resolvePromise = ref(null);
        const dateValue = ref("2022-10-10");
        const txtCalName = ref("");

        const show = () => {
            baseModal.value.open();
            return new Promise((resolve, _) => {
                resolvePromise.value = resolve;
            });
        };

        const add = () => {
            resolvePromise.value({ date: dateValue, name: txtCalName.value });
            baseAction();
        };

        const cancel = () => {
            resolvePromise.value(null);
            baseAction();
        };

        const baseAction = () => {
            baseModal.value.close();
            dateValue.value = "2022-06-30";
            txtCalName.value = "";
        };
        return {
            baseModal,
            show,
            add,
            cancel,
            txtCalName,
        };
    },
};
</script>
