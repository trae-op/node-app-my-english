

// render json out to http stream
function renderJSON(reply, result, error) {
    if (error) {
        reply(result);
    } else {
        reply(result).type('application/json; charset=utf-8');
    }
}

module.exports = renderJSON;