<template>
    <ModalBase ref="baseModal">
        <div class="content-container">
            <h2>{{ content }}그룹 삭제</h2>
            <p>정말로 삭제하시겠습니까?</p>
        </div>
        <div class="buttons-container">
            <span>
                <button class="btn confirm" @click="del">삭제</button>
                <button class="btn cancel" @click="cancel">취소</button>
            </span>
        </div>
    </ModalBase>
</template>

<script>
import ModalBase from "./ModalBase.vue";
import { ref } from "vue";

export default {
    name: "ModalGroupDelete",
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

        const del = () => {
            resolvePromise.value(true);
            baseAction();
        };

        const cancel = () => {
            resolvePromise.value(false);
            baseAction();
        };

        const baseAction = () => {
            baseModal.value.close();
            txtGroupName.value = "";
        };
        return {
            baseModal,
            show,
            del,
            cancel,
            txtGroupName,
        };
    },
};
</script>
