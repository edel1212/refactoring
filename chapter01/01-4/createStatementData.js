/**
 * 팩터리 함수 장르에 맞춰 생성자 생성
 */
function createPerformanceCalclator(aPerformance, aPlay){
    switch (aPlay.type) {
        case 'tragedy': return new TragedyCalculator(aPerformance, aPlay); //비극
        case 'comedy' : return new ComedyCalculator(aPerformance, aPlay);  //희극            
    default:
        throw new Error(`알 수 없는 장르: ${aPlay.type}`)
    }
}

class PerformanceCalculator{
    constructor(aPerformance, aPlay){
        this.performance = aPerformance;
        this.play = aPlay;
    }// constructor

    // 금액 계산 함수
    get amount(){ throw new Error("상속 받는 서버 클래스에서 처리함"); }// get 

    // 포인트 계산 함수
    get volumeCredits(){
        return Math.max(this.performance.audience - 30, 0);
    }
}

// 비극 장르 Class
class TragedyCalculator extends PerformanceCalculator{
    /** @Override 시킴 */
    get amount(){
        let result = 40000
        if (this.performance.audience > 30) result += 1000 * (this.performance.audience - 30);
        return result;
    }
}

// 희극 장르 Class
class ComedyCalculator extends PerformanceCalculator{
    /** @Override 시킴 */
    get amount(){
        let result = 30000
        if (this.performance.audience > 20) result += 10000 + 500 * (this.performance.audience - 20);
        result += 300 * this.performance.audience;
        return result;
    }

    /**
     * 👉 희극 장르만 포인트 계산 로직에 추가적인 계산이 들어갔으므로
     *    중복 계산 로직은 부모 로직에 남기고 "추가 로직"은 @Override 를 시킨 후
     *    super를 통해 부모 메서드 호출 후 그 값을 덧셈 한 후 반환함
     */
    get volumeCredits(){
        return super.volumeCredits + Math.floor(this.performance.audience / 5)
    }
}

export default function createStatementData(invoice, plays) {
    const result = {}
    result.customer             = invoice.customer           // invoices JSON 파일의 customer 정보
    result.performances         = invoice.performances.map(enrichPerformance)   // 얉은 복제본 JSON 생성
    result.totalAmount          = totalAmount(result)        // reduce를 통해 최종 가격 누적 계산           
    result.totalVolumeCredits   = totalVolumeCredits(result) // reduce를 통해 최종 포인트 누적 계산           
    return result

    /**
     * 👉 필요 값들을 객체화 시켜 관리하여 더욱 가독성이 올라가고 유지보수가 쉬어짐
     */
    function enrichPerformance(aPerformance) {
        // 👉 생성자 생성 대신 팩터리 함수 Call
        const calcualtor = createPerformanceCalclator(aPerformance, playFor(aPerformance));

        const result         = Object.assign({}, aPerformance);  
        
        result.play          = calcualtor.play;                  
        result.amount        = calcualtor.amount;                
        result.volumeCredits = calcualtor.volumeCredits;         
        return result
    }
    function playFor(aPerformance) {
        return plays[aPerformance.playID]
    }

    //function amountFor(aPerformance) {return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount;}

    //function volumneCreditFor(perf) {return new PerformanceCalculator(aPerformance, playFor(aPerformance)).volumneCreditFor;}

    function totalAmount(data) {
        return data.performances.reduce((total, p) => total + p.amount, 0)
    }
    function totalVolumeCredits(data) {
        return data.performances.reduce((total, p) => total + p.volumeCredits, 0)
    }
}