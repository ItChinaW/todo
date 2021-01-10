export function getTodo() {
    return axios.get("/v1/todo")
}

export function addTodo(data) {
    return axios.post("/v1/todo", data)
}

export function putTodo(id, data) {
    return axios.put("/v1/todo/" + id, {status: data})
}


export function deleteTodo(id) {
    return axios.delete("/v1/todo/" + id)
}

