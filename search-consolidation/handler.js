exports.handler = async (event) => {
    console.log(event);
    let searchResults = null;
    let consolidatedResults = [];
    if(typeof event ===  "string") searchResults = JSON.parse(event);
    else searchResults = event
    for(let data in searchResults) {
        console.log(data);
        consolidatedResults = consolidatedResults.concat(searchResults[data][data]);
    }
    consolidatedResults.sort((a, b) => {
    if(a.name < b.name) { return -1; }
    if(a.name > b.name) { return 1; }
    return 0;
});
    const response = {
        statusCode: 200,
        body: JSON.stringify(consolidatedResults),
    };
    return response;
};
