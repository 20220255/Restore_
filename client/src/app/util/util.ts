// taken from stackoverflow where you can get the value of a cookie in the browser
export function getCookie(key:string) {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)")
    return b ? b.pop() : ""
}

export function currencyFormat(amount:number) {
    return '$' + (amount/100).toFixed(2)
}