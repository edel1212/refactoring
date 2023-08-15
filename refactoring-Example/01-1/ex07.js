
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

    /**
     *  👉 기존 Loop 문에서 계산하면 volumeCredits값을 
     *      메서드로 뺴내어 코드를 간결하게 만들어 줄 수 있음     
     * 
     *   👉 받아들이는 매게 변수 또한 이름을 직관적으로 변경해 줌 
     */
    function volumeCreditsFor(aPerformance){
        let volumeCredits = 0;
        volumeCredits += Math.max(aPerformance.audience - 30, 0);
        if("comedy" === playFor(aPerformance).type) volumeCredits += Math.floor(aPerformance.audience/5);
        return volumeCredits;
    }

    function statment(invoices, plays){
        let totalAmount   = 0;
        let volumeCredits  = 0;
        let result = `청구 내역(고객명 ${invoices.customer}) \n`;
        const format = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format;

        for(let perf of invoices.performances){

            // 👉 추출한 함수를 이용해 값을 누적 하게 변경함
            volumeCredits = volumeCreditsFor(perf);

            result += `${playFor(perf).name}: ${format(amountFor(perf) / 100)} ${perf.audience}석\n`;
            totalAmount += amountFor(perf);
        }//for 

        result += `총액 ${format(totalAmount / 100)}\n`;
        result += `적립 포인트 ${volumeCredits}점\n`;

        return result;
    }

    console.log(statment(invoices, plays));
}