import faker from '@faker-js/faker';
import DataGen from "./types/DataGen";
import * as fs from "fs";

function generateCategory(depth: number): DataGen.Category[] {

    if (depth > 0) {
        return [{title: faker.name.title(), categories: generateCategory(depth - 1)}]
    }
    return [{title: faker.name.title()}]
}

function generateMainCategory(): DataGen.MainCategory {

    return {
        _id: faker.datatype.uuid(),
        categories: generateCategory(Math.ceil(Math.random() * 5)),
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


