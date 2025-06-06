export interface Category {
    id: string,
    name: string,
}

export interface Product {
    id: string,
    title: string,
    price: number,
    images: string[],
    description: string,
    category: Category,
}

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {

    categoryId: number,
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {}


// export interface Product {
//     id: string,
//     title: string,
//     price: number,
//     image: string,
//     description: string,
//     category: string,
// }