function calculateEachItemPrice(products){
    products.map((item)=>{
        console.log(typeof(item), )
        item.ItemPrice = parseFloat(parseFloat(item.Price) * parseInt(item.Quantity));
    })
    return products;
}

module.exports = {calculateEachItemPrice};