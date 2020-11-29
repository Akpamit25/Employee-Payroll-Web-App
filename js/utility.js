const stringifyDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric'};
    const newDate = !date ? "undefined" :
                    new Date(Date.parse(date)).toLocaleDateString('en-GB',options);
    return newDate;
}

const checkName = (name) => {
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z]{2,}([ ][A-Z]{1}[a-zA-Z]{2,}){0,}$');
    if (!nameRegex.test(name))
        throw 'Invalid Name Format';
}

const checkStartDate = (startDate) =>{
    let now = new Date();
    if (startDate > now) throw 'Date is a Future Date';
    var diff = Math.abs(now.getTime() - startDate.getTime());
    if (diff / (1000 * 60 * 60 * 24) > 30)
        throw 'Start Date Is Beyond 30 Days !';
}