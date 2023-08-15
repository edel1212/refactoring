
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

    /**
     * 💬 임시 변수는 자신이 속한 루틴에서만 의미가 있어서 루틴이 길고 복잡해지기 쉽다.
     *    따라서 아래의 코드에서 리팩토링 할부분은 이러한 변수를 제거하는것이다.
     * 
     *    👉 아래의 statment() 함수 내 코드 중 `const format =  new Intl.NumberFormat()`의 경우
     *       임시 변수에 함수를 태입한 형태인데 이러한 함수의 경우도 따로 뺴내어 사용하면
     *       좀 더 직관 적이고 코드를 이해하는데 쉽다.
     * 
     *    👉 여기서 기존 함수명이 format()였기에 해당 함수를 사용할 경우 직관적으로 한눈에 의미를 확인하기
     *       어려우며 비슷한 이름의 제공되는 라이브러리가 많아 햇갈리는 경우가 많음 따라서 함수명 변경
     *       - format()👎 => usd()👍 
     */
    function usd(aNumber){
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
                // 기존에는 선언 후 값을 대입 하였이나 이제는 변수 생성 시 바로 적용 되게 끔 변경 
                // 단위 변경 코드도 함수내에서 적용 `(aNumber / 100)` 부분
                .format(aNumber / 100 ); 
    }

    function statment(invoices, plays){
        let totalAmount   = 0;
        let volumeCredits  = 0;
        let result = `청구 내역(고객명 ${invoices.customer}) \n`;
        
        // ❌(임시변수 삭제!) const format = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format;

        for(let perf of invoices.performances){

            volumeCredits = volumeCreditsFor(perf);

            result += `${playFor(perf).name}: ${usd(amountFor(perf))} ${perf.audience}석\n`;
            totalAmount += amountFor(perf);
        }//for 

        result += `총액 ${usd(totalAmount)}\n`;
        result += `적립 포인트 ${volumeCredits}점\n`;

        return result;
    }

    console.log(statment(invoices, plays));
}