
{
    const plays = require('../json/plays.json');
    const invoices = require('../json/invoices.json');

    /***
     * 조건문과 같이 코드를 분석하지 않으면 한번에 이해할 수 없는 코드들은 
     * 다음번에 기억하기가 어렵다(휘발성이 강함) 따라서 그러한 로직은 
     * Method로 뺴놓고 구현하는 것이 유지 보수에 좋다.
     * - 예제에서는 Switch문이 그러하다
     * 
     * 👉 해당 Method에서 중요한것은 파라미터값을 건들지 않는 다는것이다.
     *    건들면 어디서 부터 잘못된지 찾는게 복잡해짐...
     *    💬 반환 변수를 만들어 해당 값을 반환하는 형식으로 구현함 
     */
    function amountFor(perf, play){
        let thisAmount = 0;

        switch(play.type){
            case 'tragedy': // 비극
                thisAmount = 40_000;
                if (perf.audience > 30){
                    thisAmount += 1_000 * (perf.audience - 30); 
                } 
                break;
            case 'comedy':  // 희극
                thisAmount = 30_000;
                if (perf.audience > 20){
                    thisAmount += 10_000 + 500 * (perf.audience - 20);
                } 
                thisAmount += 300 * perf.audience;
                break;
            default:
                throw new Error(`알 수 없는 장르: ${play.type}`);
        }// switch

        return thisAmount;
    }


    function statment(invoices, plays){
        let totalAmount   = 0;
        let volumeCredits  = 0;
        let result = `청구 내역(고객명 ${invoices.customer}) \n`;
        const format = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format;

        for(let perf of invoices.performances){

            const play = plays[perf.playID];

            /** 👉 변경한  Mehtod로 적용 */
            let thisAmount = amountFor(perf, play);

            volumeCredits += Math.max(perf.audience - 30, 0);

            if("comedy" === play.type) volumeCredits += Math.floor(perf.audience/5);

            result += `${play.name}: ${format(thisAmount / 100)} ${perf.audience}석\n`;
            totalAmount += thisAmount;
        }//for 
        result += `총액 ${format(totalAmount / 100)}\n`;
        result += `적립 포인트 ${volumeCredits}점\n`;

        return result;
    }


    console.log(statment(invoices, plays));
}