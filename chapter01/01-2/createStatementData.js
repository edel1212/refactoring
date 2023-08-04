// 로직 함수를 모듈화 시킴
export default function createStatementData(invoice, plays) {
    /**
     * 사용될 값을 복사할 Object를 생성
     *  - 값을 주입하여 사용 ( 값을 반환하는 함수를 적용 )
     */
    const result = {}
    result.customer             = invoice.customer
    result.performances         = invoice.performances.map(enrichPerformance)
    result.totalAmount          = totalAmount(result)
    result.totalVolumeCredits   = totalVolumeCredits(result)
    return result

    /****************************** */
    // 상단에 Object에 주입 될 반환 함수를
    // 내부에서 선언하여 사용함
    /****************************** */

    function enrichPerformance(aPerformance) {
        const result = Object.assign({}, aPerformance)
        result.play = playFor(result)
        result.amount = amountFor(result)
        result.volumeCredits = volumneCreditFor(result)
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
        // (2)
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