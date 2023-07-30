
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

    // 👉 임시 변수로 사용되던 로직을 메서드로 만들어 => 질의 함수로 변경
    function totalVolumeCredits(){
        let volumeCredits  = 0; 
        for(let perf of invoices.performances){
            volumeCredits = volumeCreditsFor(perf);
        }//for 
        return volumeCredits;
    }

    function statment(invoices, plays){
        let totalAmount   = 0;
        
        let result = `청구 내역(고객명 ${invoices.customer}) \n`;
            
        
        for(let perf of invoices.performances){
            totalAmount += amountFor(perf);
            result += `${playFor(perf).name}: ${usd(amountFor(perf))} ${perf.audience}석\n`;
        }//for 

        
        result += `총액 ${usd(totalAmount)}\n`;
        // 👉 변수를 인라인으로 변경하여 Method를 Call
        result += `적립 포인트 ${totalVolumeCredits()}점\n`;

        return result;
    }

    console.log(statment(invoices, plays));
}