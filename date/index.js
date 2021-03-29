module.exports = async function (context, req) {
    const dateString = (req.query.date || (req.body && req.body.date));
    let date = new Date(dateString);
    let dateOptions = {
        month:"2-digit",
        day:"2-digit",
        year:"numeric"
    };
    //Increasing date with one year
    date.setFullYear(date.getFullYear()+1);

    //
    let formattedDate = date.toLocaleDateString('en-US', dateOptions).replace(/\//g,'-')
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: formattedDate
    };
}