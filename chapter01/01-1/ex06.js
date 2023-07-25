
{
    const plays = require('../json/plays.json');
    const invoices = require('../json/invoices.json');

    function amountFor(aPerformance){
        //  👉 변수 인라인 적용 :: playFor(perf) 함수를 불러와 적용
        switch(playFor(aPerformance).type){
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
                //  👉 변수 인라인 적용 :: playFor(perf) 함수를 불러와 적용
                throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
        }// switch
        return result;
    }

    function playFor(aPerformance){
        return plays[aPerformance.playID];
    }//func

    function statment(invoices, plays){
        let totalAmount   = 0;
        let volumeCredits  = 0;
        let result = `청구 내역(고객명 ${invoices.customer}) \n`;
        const format = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format;

        for(let perf of invoices.performances){

            // let thisAmount = amountFor(perf, playFor(perf)); // 👎
            let thisAmount = amountFor(perf);                   // 👍 불필요한 매개변수 제거

            volumeCredits += Math.max(perf.audience - 30, 0);
            
            //  👉 변수 인라인 적용 :: playFor(perf) 함수를 불러와 적용
            if("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience/5);

            //  👉 변수 인라인 적용 :: playFor(perf) 함수를 불러와 적용
            result += `${playFor(perf).name}: ${format(thisAmount / 100)} ${perf.audience}석\n`;
            totalAmount += thisAmount;
        }//for 
        result += `총액 ${format(totalAmount / 100)}\n`;
        result += `적립 포인트 ${volumeCredits}점\n`;

        return result;
    }


    console.log(statment(invoices, plays));
}