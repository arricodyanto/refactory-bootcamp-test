const data = require('./data.json')

const callItems = (placement) => {
    let items = []

    data.forEach((item) => {
        if (item.placement.name == placement) items.push(item.name)
    })
    return gabung(items)
}

const callTypes = (type) => {
    let items = []

    data.forEach((item) => {
        if (item.type == type) items.push(item.name)
    })
    return gabung(items)
}

const callDates = (date) => {
    date = new Date(date).toDateString()
    let items = []

    data.forEach((item) => {
        let purchasedDate = new Date(item.purchased_at * 1000).toDateString()
        if (purchasedDate === date) items.push(item.name)
    })
    return gabung(items)
}

const callColor = (color) => {
    let items = []

    data.forEach((item) => {
        if (item.tags[2] == color) items.push(item.name)
    })
    return gabung(items)
}

const gabung = (items) => {
    return items.length ? items.join(", ") : "Data tidak ditemukan"
}

console.log(" Items in Meeting Room:\n" + callItems("Meeting Room"))
console.log("\n Electronics:\n" + callTypes("electronic"))
console.log("\n Furnitures:\n" + callTypes("furniture"))
console.log("\n Item Purchased At 16 Jan 2020:\n" + callDates("16 Januari 2020"))
console.log("\n Brown Items:\n" + callColor("brown"))