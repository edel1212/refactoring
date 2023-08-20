/**
* 변수 추출하기
*/
{
    // 이전 👎
    function price_Before(order){
        // 가격(price) = 기본 가격 - 수량 할인 + 배송비
        return order.quantity * order.itemPrice -
                Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
                Math.min(order.quantity * order.itemPrice * 0.1, 100) ;
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////

    // 리팩로팅 👍
    function price(order){
        // 가격(price) = 기본 가격 - 수량 할인 + 배송비
        // ✅ 상품 가격을 계산 하는 로직을 지역 변수로 빼내어 준다. ( 가격 * 제품 수 라는 것을 변수로 묶어 파악이 더 쉬워짐 )
        const basePrice = order.quantity * order.itemPrice;
        // ✅ 수량 할인 로직을 따로 뺴내어 준다.
        const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
        // ✅ 배송비 로직을 지역 변수로 생성
        const shopping = Math.min(basePrice * 0.1, 100);
        // 👉 직관적으로 반환 함수가 의미하는 바를 파악하기 쉬워짐
        return  basePrice - quantityDiscount +  shopping;
    }
}