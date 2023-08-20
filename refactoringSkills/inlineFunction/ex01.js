/**
* 함수 인라인하기
*/
{
    // 이전 👎
    function rating_Before(aDriver){
        return moreThanFiveLateDeliveries(aDriver) ? 2 : 1;
    }

    function moreThanFiveLateDeliveries(aDriver){
        return aDriver.numberOfLateDeliveries > 5 ;
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////

    // 리팩로팅 👍
    function rating(aDriver){
        // 직관적으로 5의 값보다 큰지 비교하는 것을 코드로 알 수 있음
        return aDriver.numberOfLateDeliveries > 5 ? 2 : 1;
    }
}