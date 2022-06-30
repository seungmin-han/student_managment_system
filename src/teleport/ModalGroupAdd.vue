<template>
    <ModalBase ref="baseModal">
        <div class="content-container">
            <h2>{{ content }}</h2>
            <div class="groupForm">
                <input
                    type="text"
                    v-model="txtGroupName"
                    placeholder="그룹 이름을 입력해주세요"
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
    name: "ModalGroupAdd",
    components: {
        ModalBase,
    },

    props: {
        content: String,
    },
    setup(props) {
        const baseModal = ref(null);
        const resolvePromise = ref(null);
        const txtGroupName = ref("");

        const show = () => {
            baseModal.value.open();
            return new Promise((resolve, _) => {
                resolvePromise.value = resolve;
            });
        };

        const add = () => {
            resolvePromise.value(txtGroupName.value);
            baseAction();
        };

        const cancel = () => {
            resolvePromise.value(null);
            baseAction();
        };

        const baseAction = () => {
            baseModal.value.close();
            txtGroupName.value = "";
        };
        return {
            baseModal,
            show,
            add,
            cancel,
            txtGroupName,
        };
    },
};
</script>
