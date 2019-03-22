const di = (param = '') => {
    return {
        getHello: fetch('/api/hello'),
        sendEmail: fetch(`/send/${param}`, {
            method: 'POST',
            body: param
        })
    }
};

export default di;