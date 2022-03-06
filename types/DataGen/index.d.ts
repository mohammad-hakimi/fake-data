declare namespace DataGen {
    interface Category {
        categories?: Category[];
        title: string;
    }

    interface MainCategory {
        categories: Category[];
        _id: string;
        title: string;
    }
}
export default DataGen;