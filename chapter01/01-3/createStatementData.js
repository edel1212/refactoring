/**
 * 공연료 계산기 클래스
 */
class PerformanceCalculator{
    constructor(aPerformance, aPlay){
        this.performance = aPerformance;
        this.play = aPlay;
    }
}

export default function createStatementData(invoice, plays) {
    const result = {}
    result.customer             = invoice.customer           // invoices JSON 파일의 customer 정보
    result.performances         = invoice.performances.map(enrichPerformance)   // 얉은 복제본 JSON 생성
    result.totalAmount          = totalAmount(result)        // reduce를 통해 최종 가격 누적 계산           
    result.totalVolumeCredits   = totalVolumeCredits(result) // reduce를 통해 최종 포인트 누적 계산           
    return result

    function enrichPerformance(aPerformance) {
        // 계산기 클래스 생성자 생성
        const calcualtor = new PerformanceCalculator(aPerformance, playFor(aPerformance));

        const result         = Object.assign({}, aPerformance);  
        result.play          = playFor(result);                  
        result.amount        = amountFor(result);                
        result.volumeCredits = volumneCreditFor(result);         
        return result
    }
    function playFor(aPerformance) {
        return plays[aPerformance.playID]
    }
    function amountFor(aPerformance) {
        let result = 0

        switch (playFor(aPerformance).type) {
        case 'tragedy': //비극
            result = 40000
            if (aPerformance.audience > 30) {
            result += 1000 * (aPerformance.audience - 30)
            }
            break
        case 'comedy': //희극
            result = 30000
            if (aPerformance.audience > 20) {
            result += 10000 + 500 * (aPerformance.audience - 20)
            }
            result += 300 * aPerformance.audience
            break
        default:
            throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`)
        }

        return result
    }
    function volumneCreditFor(perf) {
        let result = 0
        result += Math.max(perf.audience - 30, 0)
        // 희극 관객 5명마다 추가 포인트를 제공한다
        if (playFor(perf).type === 'comedy') result += Math.floor(perf.audience / 5)
        return result
    }
    function totalAmount(data) {
        return data.performances.reduce((total, p) => total + p.amount, 0)
    }
    function totalVolumeCredits(data) {
        return data.performances.reduce((total, p) => total + p.volumeCredits, 0)
    }
}