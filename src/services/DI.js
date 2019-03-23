const di = (param = '') => {
    const url = new URL('https://shrouded-badlands-76315.herokuapp.com');
    return {
        getHello: fetch(url + '/api/hello'),
        sendEmail: fetch(url+ `/send/${param}`, {
            method: 'POST',
            body: param
        })
    }
};

export default di;