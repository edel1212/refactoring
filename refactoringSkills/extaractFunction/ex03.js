/**
* 지역 변수의 값을 변경 할 때
**/
{
    // 지역 변수를 사용만 할 경우 👎
    function printOwing_BeforeVer(invoice) {
        let outstanding = 0;

        printBanner();

        for (const o of invoice.order) {
            outstanding += o.amount;
        }

        // ✅ 마감일 설정 로직을 함수 추출 로직으로 변경
        recordDueDate(invoice);

        // ✅ 지역 변수를 매개변수로 전달하는 형식
        printDetails(invoice, outstanding);
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////

    // 리팩로팅 👍
    function printOwing_Refactoring(invoice) {
        printBanner();
        // ✅ 추출한 함수가 반환 값을 원래 변수에 다시 저장하게 끔함
        const outstanding = calculateOutstanding(invoice);
        recordDueDate(invoice);
        printDetails(invoice, outstanding);
    }

    /**********************************************/
    /****************** 쪼개진 함수 ******************/
    /**********************************************/

    // 배너 출력 로직
    function printBanner(){
        console.log("--고객채무--");
    }

    // 세부 사항 출력
    function printDetails(invoice, outstanding){
        console.log(`고객명: ${invoice.customer}`);
        console.log(`채무액: ${outstanding}`);
        console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
    }

    // 마감일 설정
    function recordDueDate(invoice){
        const today = Clock.today;
        invoice.dueDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 30
        );
    }

    // 계산 로직
    function calculateOutstanding(invoice){
        // 👉 좀 더 직관적인 변수명인 result로 변경
        let result = 0;
        for (const o of invoice.order) {
            result += o.amount;
        }
        return result;
    }

}