
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
        let result = 0;
        result += Math.max(aPerformance.audience - 30, 0);
        if("comedy" === playFor(aPerformance).type) result += Math.floor(aPerformance.audience/5);
        return result;
    }

    function usd(aNumber){
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
                .format(aNumber / 100 ); 
    }

    function totalVolumeCredits(){
        let result  = 0; 
        for(let perf of invoices.performances){
            result = volumeCreditsFor(perf);
        }//for 
        return result;
    }
    /**
     * 👉 기존 totalAmount값을 받아오는 Loop문 내의 코드를
     *    함수로 변경 하여 사용
     */
    function totalAmount(){
        let result   = 0;
        for(let perf of invoices.performances){
            result += amountFor(perf);
        }//for 
        return result;
    }


    function statment(invoices, plays){
        
        let result = `청구 내역(고객명 ${invoices.customer}) \n`;
        
        for(let perf of invoices.performances){
            result += `${playFor(perf).name}: ${usd(amountFor(perf))} ${perf.audience}석\n`;
        }//for 

        // 👉 변수를 인라인으로 변경하여 Method를 Call
        result += `총액 ${usd(totalAmount())}\n`;
        result += `적립 포인트 ${totalVolumeCredits()}점\n`;

        return result;
    }

    console.log(statment(invoices, plays));
}