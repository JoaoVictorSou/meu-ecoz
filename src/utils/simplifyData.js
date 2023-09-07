function get_now_datetime() {
    // A função retorna uma String no formato YYYY-MM-DD HH:MI:SS
    const datetime = new Date()
    
    const year = datetime.getFullYear()
    const month = datetime.getMonth()
    const day = datetime.getDay()
    const hour = datetime.getHours()
    const minute = datetime.getMinutes()
    const seconds = datetime.getSeconds()
    console.log(`${year}-${month}-${day} ${hour}:${minute}:${seconds}`)
    return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`
}

export { get_now_datetime }