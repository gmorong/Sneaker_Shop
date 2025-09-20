import {$authHost, $host} from "./index";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const deleteType = async (name) => {
    const {data} = await $authHost.delete('api/type', {params: {
        name
    }})
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}

export const deleteBrand = async (name) => {
    const {data} = await $authHost.delete('api/brand', {params: {
        name
    }})
    return data
}

export const createGoods = async (goods) => {
    const {data} = await $authHost.post('api/goods/', goods)
    return data
}

export const fetchGoods = async (typeId, brandId, page, limit) => { //
    const {data} = await $host.get('api/goods/', {params: {
            typeId, brandId, page, limit
        }})
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/goods/' + id)
    return data
}

export const deleteGoods = async (name) => {
    const {data} = await $authHost.delete('api/goods/', {params : {
        name
    }})
    return data
}

export const fetchGoodsName = async (name) => { //
    const {data} = await $host.get('api/goods/', {params: {
            name
        }})
    return data
}

export const changeMin = async (id, size) => {
    const {data} = await $authHost.post('api/goods/changemin', {id, size})
    return data
}

export const changeRem = async (id, size) => {
    const {data} = await $authHost.post('api/goods/changerem', {id, size})
    return data
}