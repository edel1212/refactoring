/**
* 유효 범위를 벗어나는 변수가 없을 떄
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

        // 마감일(dueDate)를 기록한다.
        // 👉 Clock.today : 시스템 시계를 감싸는 개체이다 - Date.now()를 사용하지 않는 이유는 테스트할 때 마다 결과값이 달라져서
        //                   오류를 재현하기 어렵기 떄문
        const today = Clock.today;
        invoice.dueDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 30
          );

        // 세부 사항 출력
        console.log(`고객명: ${invoice.customer}`);
        console.log(`채무액: ${outstanding}`);
        console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////

    // 리팩로팅 👍
    function printOwing_Refactoring(invoice) {
        let outstanding = 0;

        // ✅ 배너 출력 로직을 함수로 추출
        printBanner();

        for (const o of invoice.order) {
            outstanding += o.amount;
        }

        const today = Clock.today;
        invoice.dueDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 30
        );

        // ✅ 세부사항 출력 로직을 함수로 추출
        printDetails();

        // 세부 사항 출력
        // 중첩 함수로 정의되어 printOwing()에 정의되어 있는 모든 변수에 접근이 가능하다
        // 단 중첩 함수가 지원하지 않는 경우 또한 생각해줘야 한다.
        function printDetails(){
            console.log(`고객명: ${invoice.customer}`);
            console.log(`채무액: ${outstanding}`);
            console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
        }
    }

    /**********************************************/
    /****************** 쪼개진 함수 ******************/
    /**********************************************/

    // 배너 출력 로직
    function printBanner(){
        console.log("--고객채무--");
    }
}