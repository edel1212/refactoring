// 로직 함수를 모듈화 시킴
export default function createStatementData(invoice, plays) {
    /**
     * 사용될 값을 복사할 Object를 생성
     *  - 값을 주입하여 사용 ( 값을 반환하는 함수를 적용 )
     */
    const result = {}
    result.customer             = invoice.customer           // invoices JSON 파일의 customer 정보
    result.performances         = invoice.performances.map(enrichPerformance)   // 얉은 복제본 JSON 생성
    result.totalAmount          = totalAmount(result)        // reduce를 통해 최종 가격 누적 계산           
    result.totalVolumeCredits   = totalVolumeCredits(result) // reduce를 통해 최종 포인트 누적 계산           
    return result

    /****************************** */
    // 상단에 Object에 주입 될 반환 함수를
    // 내부에서 선언하여 사용함
    /****************************** */

    // 얕은 복사를 통해 JSON 데이터를 복사 생성
    function enrichPerformance(aPerformance) {
        const result         = Object.assign({}, aPerformance)  // 복사
        result.play          = playFor(result)                  // plays JSON 파일에서 값을 추출
        result.amount        = amountFor(result)                // 장르별 가격 측정
        result.volumeCredits = volumneCreditFor(result)         // 포인트 측정
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