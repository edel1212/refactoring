
{
    const plays = require('../json/plays.json');
    const invoices = require('../json/invoices.json');

    function amountFor(aPerformance, play){
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

    function playFor(aPerformance){
        return plays[aPerformance.playID];
    }//func

    function statment(invoices, plays){
        let totalAmount   = 0;
        let volumeCredits  = 0;
        let result = `청구 내역(고객명 ${invoices.customer}) \n`;
        const format = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format;

        for(let perf of invoices.performances){
            /**
             * 해당 변수와 같은 형식 들때문에 로컬 범위에 존재하는 이름이 늘어나서 추출 작업이 복잡해지기에
             * 아래의 방법과 같이 메서드 형태로 뺴내어서 변수가 아닌 메서드를 CallBack 받는 식으로 진행하면 좋다.
             * 
             * 👉 이러한 것을 임시 변수를 질의 함수로 바꾸는 것이며 
             *    해당 방법은 Step1 이며 ex06단계로 이어진다
             */
            //const play = plays[perf.playID];   // 👎
            const play = playFor(perf);          // 👍

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