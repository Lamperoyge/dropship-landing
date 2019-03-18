const di = () => {
    return {
        getHello: fetch('/api/hello')
    }
};

export default di;