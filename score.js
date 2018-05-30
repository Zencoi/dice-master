const internals = {}
internals.value = 0;

const Score = {
    addScore(value) {
        internals.value = internals.value + value;
    },

    resetScore() {
        internals.value = 0;
    },

    getScore() {
        return internals.value;
    }
}

export default Score;
