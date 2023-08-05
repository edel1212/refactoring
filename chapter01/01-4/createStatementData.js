// 👉 생성자를 만드는 팩터리 함수 생성
function createPerformanceCalclator(aPerformance, aPlay){
    return new PerformanceCalculator(aPerformance, aPlay);
}

class PerformanceCalculator{
    constructor(aPerformance, aPlay){
        this.performance = aPerformance;
        this.play = aPlay;
    }// constructor

    // 금액 계산 함수
    get amount(){
        let result = 0
        switch (this.play.type) {
            case 'tragedy': //비극
                result = 40000
                if (this.performance.audience > 30) {
                    result += 1000 * (this.performance.audience - 30)
                }
                break
            case 'comedy': //희극
                result = 30000
                if (this.performance.audience > 20) {
                    result += 10000 + 500 * (this.performance.audience - 20)
                }
                result += 300 * this.performance.audience
                break
            default:
                throw new Error(`알 수 없는 장르: ${this.play.type}`)
        }
        return result
    }// get 

    // 포인트 계산 함수
    get volumneCreditFor(){
        let result = 0
        result += Math.max(this.performance.audience - 30, 0)
        // 희극 관객 5명마다 추가 포인트를 제공한다
        if (this.play.type === 'comedy') result += Math.floor(this.performance.audience / 5)
        return result
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
        result.volumeCredits = calcualtor.volumneCreditFor;         
        return result
    }
    function playFor(aPerformance) {
        return plays[aPerformance.playID]
    }

    function amountFor(aPerformance) {return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount;}

    function volumneCreditFor(perf) {return new PerformanceCalculator(aPerformance, playFor(aPerformance)).volumneCreditFor;}

    function totalAmount(data) {
        return data.performances.reduce((total, p) => total + p.amount, 0)
    }
    function totalVolumeCredits(data) {
        return data.performances.reduce((total, p) => total + p.volumeCredits, 0)
    }
}