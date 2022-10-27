export default {
    methods: {
        sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },

        hexTorgba(hex, alpha = 1) {
            const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
            return `rgba(${r},${g},${b},${alpha})`;
        },
    }
}