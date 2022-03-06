import faker from '@faker-js/faker';
import DataGen from "./types/DataGen";
import * as fs from "fs";


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


function main() {
    const fakeData: DataGen.MainCategory[] = []
    for (let i = 0; i < 1000; i++) {
        fakeData.push(generateMainCategory())
    }
    fs.writeFile("data.json", JSON.stringify(fakeData), () => {
    })
}

main()


