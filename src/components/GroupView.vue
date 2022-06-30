<template>
    <ul class="group">
        <li v-for="(group, index) in childGroup" :key="index">
            <span v-for="(pName, pIndex) in parentNames" :key="pIndex">
                {{ pName }} /
            </span>
            {{ group.name }}
            <button
                @click="$emit('showCalModal', { type: 'add', target: group })"
            >
                일정 생성
            </button>
            <button
                @click="$emit('showGroupModal', { type: 'add', target: group })"
            >
                서브 그룹 생성
            </button>
            <button
                @click="
                    $emit('showGroupModal', {
                        type: 'edit',
                        target: parentGroup,
                        index: index,
                    })
                "
            >
                수정
            </button>
            <button
                @click="
                    $emit('showGroupModal', {
                        type: 'delete',
                        target: parentGroup,
                        index: index,
                    })
                "
            >
                삭제
            </button>
            <ul class="group">
                <li v-for="(cal, cIndex) in group.cal" :key="cIndex">
                    {{ cal.name }} / {{ cal.date }}
                    루트 처리
                    <button>수정</button>
                    <button>삭제</button>
                </li>
            </ul>
            <GroupView
                :parentGroup="group"
                :childGroup="group.sub"
                v-bind:parentNames="[...parentNames, group.name]"
                @showGroupModal="$emit('showGroupModal', $event)"
                @showCalModal="$emit('showCalModal', $event)"
            ></GroupView>
        </li>
    </ul>
</template>

<script>
import { reactive, ref } from "vue";
export default {
    name: "GroupView",
    props: { parentGroup: Array, childGroup: Array, parentNames: Array },
    emits: ["showGroupModal", "showCalModal"],
    setup(props, { emit }) {},
};
</script>

<style></style>
