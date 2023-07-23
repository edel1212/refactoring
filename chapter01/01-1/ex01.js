
const plays = require('../json/plays.json');
const invoices = require('../json/invoices.json');


/**
 * 기능 예시
 * 다양한 연극을 외주 받아 공연하는 극단에서 공연 요처이 들어오면 연극의 
 * "장르" 와 "관객 규모"를 기초로 비용을 책정한다 그리고 공연료와 별개로 포인트를 지급해서
 * 다음번 의뢰 시 공연료를 "할인" 받을 수도 있다. - 일종의 충성도 계산 프로그램
 */
function statment(invoices, plays){
    // 총 가격
    let totalAmount   = 0;
    // 포인트
    let volumeCredits  = 0;
    let result = `청구 내역(고객명 ${invoices.customer}) \n`;
    const format = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format;

    for(let perf of invoices.performances){
        const play = plays[perf.playID];
        // 가격
        let thisAmount = 0;

        switch(play.type){
            case 'tragedy': // 비극
                thisAmount = 40_000;
                if (perf.audience > 30) thisAmount += 1_000 * (perf.audience - 30);
                break;
            case 'comedy':  // 희극
                thisAmount = 30_000;
                if (perf.audience > 20) thisAmount += 10_000 + 500 * (perf.audience - 20);
                thisAmount += 300 * perf.audience;
                break;
            default:
                throw new Error(`알 수 없는 장르: ${play.type}`);
        }// switch

        // 포인트 적립
        volumeCredits += Math.max(perf.audience - 30, 0);

        // 희극 관객 5명  마다 추가 포이느 제공
        if("comedy" === play.type) volumeCredits += Math.floor(perf.audience/5);

        // 청구 내역을 출력한다.
        result += `${play.name}: ${format(thisAmount / 100)} ${perf.audience}석\n`;
        totalAmount += thisAmount;
    }//for
    result += `총액 ${format(totalAmount / 100)}\n`;
    result += `적립 포인트 ${volumeCredits}점\n`;

    return result;
}


console.log(statment(invoices, plays));