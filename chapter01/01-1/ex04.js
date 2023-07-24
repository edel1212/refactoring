
{
    const plays = require('../json/plays.json');
    const invoices = require('../json/invoices.json');

    /***
     * 💬 매개변수의 경우 역할이 뚜렷하지 않을 경우 부정 관사(a/an)을 붙여주자
     */
    function amountFor(aPerformance, play){
        // let thisAmount = 0;   👎
        let result = 0;       // 👍

        switch(play.type){
            case 'tragedy': // 비극
                result = 40_000;
                if (aPerformance.audience > 30){
                    result += 1_000 * (aPerformance.audience - 30); 
                } 
                break;
            case 'comedy':  // 희극
                result = 30_000;
                if (aPerformance.audience > 20){
                    result += 10_000 + 500 * (aPerformance.audience - 20);
                } 
                result += 300 * aPerformance.audience;
                break;
            default:
                throw new Error(`알 수 없는 장르: ${play.type}`);
        }// switch

        return result;
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