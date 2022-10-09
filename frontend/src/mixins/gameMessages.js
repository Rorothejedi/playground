export default {

    data() {
        return {
            infoMessage: null,
            loadingMessage: null,
        }
    },

    beforeUnmount() {
        this.removeMessage();
    },

    methods: {
        createInfoMessage(text) {
            if (this.infoMessage) return;

            this.infoMessage = window.$message.info(text, {
                duration: 0,
            });
        },

        createLoadingMessage(text) {
            if (this.loadingMessage) return;

            this.loadingMessage = window.$message.loading(
                text, {
                    duration: 0,
                }
            );
        },

        removeMessage() {
            if (this.loadingMessage) {
                this.loadingMessage.destroy();
                this.loadingMessage = null;
            }
            if (this.infoMessage) {
                this.infoMessage.destroy();
                this.infoMessage = null;
            }
        },
    }
}