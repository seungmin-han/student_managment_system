<template>
    <ModalBase ref="baseModal">
        <div class="content-container">
            <h2>{{ content }} 그룹 수정</h2>
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
                <button class="btn confirm" @click="edit">수정</button>
                <button class="btn cancel" @click="cancel">취소</button>
            </span>
        </div>
    </ModalBase>
</template>

<script>
import ModalBase from "./ModalBase.vue";
import { ref } from "vue";

export default {
    name: "ModalGroupEdit",
    components: {
        ModalBase,
    },

    props: {
        content: String,
    },
    setup(props) {
        const baseModal = ref(null);
        const resolvePromise = ref(null);
        const txtGroupName = ref(props.content);

        const show = () => {
            baseModal.value.open();
            return new Promise((resolve, _) => {
                resolvePromise.value = resolve;
            });
        };

        const edit = () => {
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
            edit,
            cancel,
            txtGroupName,
        };
    },
};
</script>
