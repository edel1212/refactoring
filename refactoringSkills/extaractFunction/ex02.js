/**
* 지역 변수를 사용할 때
**/
{
    // 이전 👎
    function printOwing_BeforeVer(invoice) {
        let outstanding = 0;

        console.log("--고객채무--");

        // 미해결 채무(outstanding)를 계산한다.
        for (const o of invoice.order) {
            outstanding += o.amount;
        }

        const today = Clock.today;
        invoice.dueDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 30
          );

        console.log(`고객명: ${invoice.customer}`);
        console.log(`채무액: ${outstanding}`);
        console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
    }

    // 리팩로팅 👍
    function printOwing_Refactoring(invoice) {
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
}