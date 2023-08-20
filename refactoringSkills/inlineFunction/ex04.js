/**
* 변수 추출하기 - 클래스 안에서
*/
{
    // 이전 👎
    class Order_Before{
        constructor(aRecord){
            this._data = aRecord;
        }

        get quantity() {return this._data.quantity;}
        get itemPrice() {return this._data.itemPrice;}

        get price(){
            return order.quantity * order.itemPrice -
                                   Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
                                   Math.min(order.quantity * order.itemPrice * 0.1, 100) ;
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////

    // 리팩로팅 👍
    class Order_Before{
            constructor(aRecord){
                this._data = aRecord;
            }

            get quantity() {return this._data.quantity;}

            get itemPrice() {return this._data.itemPrice;}

            get basePrice(){
                return  this._data.quantity * this._data.itemPrice;
            }

            get quantityDiscount(){
                return Math.max(0, this._data.quantity - 500) * this._data.itemPrice * 0.05;
            }

            get shopping(){
                return Math.min(this.basePrice() * 0.1, 100);
            }

            get price(){
                return this.basePrice() - this.quantityDiscount() + shopping();
            }
        }
}