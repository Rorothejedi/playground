export default {
    data() {
        return {
            windowWidth: window.innerWidth,
        }
    },

    computed: {
        isMobile() {
            return this.windowWidth <= 600;
        },
    },

    mounted() {
        window.addEventListener("resize", this.onResize);
    },

    beforeUnmount() {
        window.removeEventListener("resize", this.onResize);
    },

    methods: {
        onResize() {
            this.windowWidth = window.innerWidth;
        },
    }
}