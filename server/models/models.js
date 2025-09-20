const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Users = sequelize.define('users',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    second_name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique:true},
    p_number: {type: DataTypes.STRING, unique:true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Goods = sequelize.define('goods',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique:true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rem_stock: {type: DataTypes.INTEGER, allowNull: false},
    min_amount: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define('type',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique:true, allowNull: false},
})

const Brand = sequelize.define('brand',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique:true, allowNull: false},
})

const GoodsInfo = sequelize.define('goods_info',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const TypeBrand = sequelize.define('type_brand',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketGoods = sequelize.define('basket_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


Users.hasOne(Basket)
Basket.belongsTo(Users)

Basket.hasMany(BasketGoods)
BasketGoods.belongsTo(Basket)

Goods.hasMany(BasketGoods)
BasketGoods.belongsTo(Goods)



Type.hasMany(Goods)
Goods.belongsTo(Type)

Brand.hasMany(Goods)
Goods.belongsTo(Brand)

Goods.hasMany(GoodsInfo, {as: 'info'});
GoodsInfo.belongsTo(Goods)



module.exports = {
    Users,
    Goods,
    Type,
    Brand,
    TypeBrand,
    GoodsInfo,
    Basket,
    BasketGoods
}