import {makeAutoObservable} from "mobx";

export default class GoodsStore {
    constructor() {
        this.info = []
        this._types = []
        this._brands = []
        this._goods = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 8
        this._name = ''
        makeAutoObservable(this)
    }
    
    setInfo(info){
        this.info = info
    }
    setTypes(types) {
        this._types = types
    }
    setBrand(brands) {
        this._brands = brands
    }
    setGoods(goods) {
        this._goods = goods
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }
    setLimit(limit) {
        this._limit = limit
    }
    setSelectedtype(type){
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedbrand(brand){
        this.setPage(1)
        this._selectedBrand = brand
    }
    setName(name){
        this._name = name
    }

    get name(){
        return this._name
    }
    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get goodses() {
        return this._goods
    }
    get SelectedType(){
        return this._selectedType
    }
    get SelectedBrand(){
        return this._selectedBrand
    }
    get page() {
        return this._page
    }
    get totalCount() {
        return this._totalCount
    }
    get limit() {
        return this._limit
    }

}