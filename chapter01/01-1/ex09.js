
{
    const plays = require('../json/plays.json');
    const invoices = require('../json/invoices.json');

    function amountFor(aPerformance){
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
                throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
        }// switch
        return result;
    }

    function playFor(aPerformance){
        return plays[aPerformance.playID];
    }//func

    function volumeCreditsFor(aPerformance){
        let volumeCredits = 0;
        volumeCredits += Math.max(aPerformance.audience - 30, 0);
        if("comedy" === playFor(aPerformance).type) volumeCredits += Math.floor(aPerformance.audience/5);
        return volumeCredits;
    }

    function usd(aNumber){
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
                .format(aNumber / 100 ); 
    }

    function statment(invoices, plays){
        let totalAmount   = 0;
        
        let result = `청구 내역(고객명 ${invoices.customer}) \n`;
            
        
        for(let perf of invoices.performances){
            totalAmount += amountFor(perf);
            result += `${playFor(perf).name}: ${usd(amountFor(perf))} ${perf.audience}석\n`;
        }//for 

        /**
         *  👉 기존 한번에 처리하던 반복을 따로 옮김
         * 
         * 🤫 여기서 의문 이러면 성능상 문제가 있는거 아닌가 ..?
         *    한번의 반복문으로 처리되던걸 왜.. 왜 굳이 ? 이어지는 코드에서 
         *    그거에 관란 리펠토링이 예정이다.
         */
        let volumeCredits  = 0; //  👉 직관적으로 볼 수 있도록 변수명을 해당 반복문 앞으로 이동
        for(let perf of invoices.performances){
            volumeCredits = volumeCreditsFor(perf);
        }//for 

        result += `총액 ${usd(totalAmount)}\n`;
        result += `적립 포인트 ${volumeCredits}점\n`;

        return result;
    }

    console.log(statment(invoices, plays));
}