export const HeaderService = {
    header: {},

    depth(depth) {
        this.header.depth = depth;
        return this;
    },

    build() {
        const build = this.header;
        this.header = {};
        return build;
    }
};
