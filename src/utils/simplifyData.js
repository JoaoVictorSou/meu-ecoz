function get_now_datetime() {
    // A função retorna uma String no formato YYYY-MM-DD HH:MI:SS
    const datetime = new Date()
    
    const year = datetime.getFullYear()
    const month = datetime.getMonth()+1
    const day = datetime.getDate()
    const hour = datetime.getHours()
    const minute = datetime.getMinutes()
    const seconds = datetime.getSeconds()

    return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`
}

function informed_moment(datetime) {
    let moment = new Date(datetime)

    const month = String(moment.getMonth()+1).padStart(2, '0')
    const day = String(moment.getDate()).padStart(2, '0')
    const hour = String(moment.getHours()).padStart(2, '0')
    const minute = String(moment.getMinutes()).padStart(2, '0')

    moment = `${day}/${month} ${hour}:${minute}`
    
    return moment 
}

export { get_now_datetime, informed_moment }