const FormateDate = (isoDateString) => {
    
    const date = new Date(isoDateString);

    
    const month = date.getMonth() + 1; 
    const day = date.getDate(); 
    const year = date.getFullYear(); 

    
    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');

    
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

    return formattedDate
}

module.exports = FormateDate