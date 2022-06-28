import { createWebHistory, createRouter } from "vue-router";
import MainPage from "@/components/MainPage.vue";
import ViewPage from "@/components/ViewPage.vue";
import AddPage from "@/components/AddPage.vue";

const routes = [
    {
        path: "/",
        name: "MainPage",
        component: MainPage,
    },
    {
        path: "/view",
        name: "ViewPage",
        component: ViewPage,
    },
    {
        path: "/add",
        name: "AddPage",
        component: AddPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
