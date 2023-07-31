
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
    function totalAmount(){
        let result   = 0;
        for(let perf of invoices.performances){
            result += amountFor(perf);
        }//for 
        return result;
    }

    function rederPlainText(data, plays){
        let result = `청구 내역(고객명 ${data.customer}) \n`;
        for(let perf of data.performances){
            // 👉 기존 playFor(perf).name 사용 부분을 data에서 가져오도록 수정 
            result += `${perf.play.name}: ${usd(amountFor(perf))} ${perf.audience}석\n`;
        }//for 

        result += `총액 ${usd(totalAmount())}\n`;
        result += `적립 포인트 ${totalVolumeCredits()}점\n`;
        return result;
    }

    /**
     * 👉 얕은 복사를 하는 함수 
     *    - 사용 이유는 함수로 건네는 데이터를 수정하는 것은 좋은 방법이 아니기 떄문이다.
     *    - 받아오는 데이터들이 가줒 변하게 되면 로직이 복잡해 지기떄문에 최대한 불변 취급 해주자.
     */
    function enrichPerformance(aPerformance){
        // 👉 얕은 복사 [ 메모리값을 공유 ]
        const result = Object.assign({},aPerformance);
        // 👉 Object에 play Data를 추가
        result.play = playFor(result);
        return result;
    }

    function statment(invoices, plays){       
        const statementData = {};
        statementData.customer = invoices.customer;
        // 👉 JSON 데이터를 바로 사용 하는 것이 아닌 얕은 복사를 사용
        statementData.performances = invoices.performances.map(enrichPerformance);
        console.log(statementData);
        return rederPlainText(statementData, plays);
    }

    console.log(statment(invoices, plays));
}