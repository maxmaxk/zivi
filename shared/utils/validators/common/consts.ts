export const emailRegexp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
export const loginRegexp = /^[a-zA-Z0-9-_]{4,20}$/
export const passwordRegexp = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,32}$/
export const phoneRegexp = /(^8|7|\+7)((\d{10})|(\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}))/
export const kppRegexp = /^[0-9]{4}[0-9A-Z]{2}[0-9]{3}$/
export const bikRegexp = /^04\d{7}$/
export const cyrrilicRegexp = /^[А-Яа-я-]{1,100}$/
