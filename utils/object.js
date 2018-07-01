exports.shallowCopy = (obj) => {
    const newObj = {}
    for (let prop in obj) {
        newObj[prop] = obj[prop]
    }
    return newObj
}