import request from "../utils/request"

export function getTodo() {
    return request.get("/v1/todo")
}

export function addTodo(data) {
    return request.post("/v1/todo", data)
}

export function putTodo(id, data, title) {
    return request.put("/v1/todo/" + id, {status: data, title: title})
}

export function deleteTodo(id) {
    return request.delete("/v1/todo/" + id)
}

//      user
export function login(data) {
    return request.post("/v1/user/login", data)
}

export function register(data) {
    return request.post("/v1/user/register", data)
}

