import faker from '@faker-js/faker';
import DataGen from "./types/DataGen";
import * as fs from "fs";

// ========================== PRODUCING DATA =================================
function generateCategory(): DataGen.Category {

    return {
        title: faker.name.title()
    }
}

function generateCategories(depth: number): DataGen.Category[] {

    if (depth > 0) {
        const fakeData: DataGen.Category[] = []
        for (let i = 0; i < Math.ceil(Math.random() * 5); i++) {
            fakeData.push(generateCategory())
        }
        return [{title: faker.name.title(), categories: fakeData}, ...generateCategories(depth - 1)]
    }
    const fakeData: DataGen.Category[] = []
    for (let i = 0; i < Math.ceil(Math.random() * 5); i++) {
        fakeData.push(generateCategory())
    }
    return [{title: faker.name.title(), categories: fakeData}]
}

function generateMainCategory(): DataGen.MainCategory {
    return {
        _id: faker.datatype.uuid(),
        categories: generateCategories(Math.ceil(Math.random() * 5)),
        title: faker.name.title()
    }
}


function produce() {
    const fakeData: DataGen.MainCategory[] = []
    for (let i = 0; i < 1000; i++) {
        fakeData.push(generateMainCategory())
    }
    fs.writeFile("data.json", JSON.stringify(fakeData), () => {
    })
}


// ============================== READING DATA =========================
const readData: any[] = []

function dfs(item: any, level: number, index: number) {
    if (typeof item === "string") {
        readData.push({index, level, item})
        return
    }
    if (!item) {
        return
    }
    if (Array.isArray(item)) {
        for (let i = 0; i < item.length; i++) {
            dfs(item[i], level + 1, index)
        }
        return
    }
    for (let i = 0; i < Object.keys(item).length; i++) {
        if (item[Object.keys(item)[i]] === '3') {
            return
        }
        dfs(item[Object.keys(item)[i]], level + 1, index)
    }
}

function read() {
    let data: any[] = JSON.parse(fs.readFileSync("data.json").toString())
    for (let i = 0; i < data.length; i++) {
        dfs(data[i], 0, i)
    }
    console.log(readData)
}


read()
