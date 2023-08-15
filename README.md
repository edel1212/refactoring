# Refactoring

### 기이한 이름
- 코드는 단순하고 명료하게 작성해야한다.
- 코드를 명료하게 표한하는데 가장 중요한 요소는 바로 `이름`이다.
- 이름만 잘 지어도 문백을 파악하느라 헤매는 시간을 크게 절약 할 수 있다.

### 중복 코드
- 똑같은 코드 구조가 여러 곳에서 번복 된다면 하나로 통합혀야 더 나은 프로그램을 만들 수 있다
  - 같은 코드가 3번 이상 반복 되면 그 코드는 하나의 메서드로 만들어 사용해주자
- 한 클래스에 딸린 두 메서드가 똑같은 표현식을 사용하는 경우 `함수 추출하기`를 써서 양쪽 모두 추출된 메서드를 호출하게 바꾸자
- 코드가 비슷하긴 한데 완전히 똑같지 않다면 `문장 슬라이드하기`로 비슷한 부분을 한곳에 모아 함수 추출하기를 더 쉽게 적용할 수 있는지 확인해 보자

### 긴 함수
- 오랜 기간 잘 활용돠는 프로그램들의 코드 들은 하나 같이 `짧은 함수`로 구성되어 있다.
  - 내부 로직에는 연산하는 부분이 하나도 없어 보인다.
    - 코드가 끝 없이 위임 하는 방시긍로 작성되어 있기 떄문이다.
- `간접 호출의 효과` : 코드를 이해, 공유, 선택하기 쉬워진다는 장접은 장점은 함수를 짧게 구성할 떄 나오는 것이다.
- 여기서도 짧은 함수로 구성된 코드를 이해하기 쉽게 만드는 가장 쉽고 확실한 방법은 `이름을 잘 지어두기`이다.
  - 함수 이름은 동장 방식이 아닌 `의도`가 잘들어나게 지어야한다.
- 원래 코드보다 길어지도라도 함수 단위로 `쪼개`어서 구현 후 의도에 맞게 이름을 지어 주자.
- 함수를 짧게 만드는 작업의 99%는 `함수 추출하기`이다.
  - 함수 본문에서 따로 묶어서 뺴낼 수 있는 코드 덩어리를 찾아 `새로운 함수를 만드`는 것이다.
- 리팩토링 대상의 함수가 매개변수와 임시 변수를 많이 사용한다면 함수를 추출하는데 어려울 수 있는데 이럴 땐 `매개변수를 객체로 만들기` 와 `그 객체 통쨰로 넘기기`를 사용하자
- 추출할 코드 덩어리 찾는 방법은?
  - 주석을 위주로 찾자 `주석이 달려있는 코드는` 코드만으로 이해하기 어렵기에 달려있을 확률이 높기 떄문이다.
    - 주석을 기준으로 만들어진 메서드의 경우 메서드 명은 주석명을 기반으로 작성해주자.
    - 코드가 단 한줄일 경우에도 설명할 필요가 있다면 함수로 추출하는 게 좋다.
  - 조건문이나 반복문의 경우에도 사용할 수 있다.
    - switch문
      - 거대한 switch의 경우 case문 마다 `함수를 추출`을 적용해서 각 case의 본문을 함수 호출문 하나로 변경 한다.
      - 같은 조건을 기준으로 나뉘는 switch문이 여러 개라면 `조건부 로직을 다형성`으로 바꿔주자.
    - 반복문
      - 반복문 내부의 로직이 길어 진다면 독립된 함수로 추출하여 생성한다.


### 긴 매개변수 목록
- 매개변수 목록이 길어지면 그 자체로 이해하가 어려우므로 리팰토링 해줄 필요가 있다.
- 다른 매개 변수에서 값을 얻어 와야하는 매개 변수가 있는데 이런 경우 `매개변수를 질의 함수 바꾸기`로 제거 할 수 있다.
```javscript
// 👎 원래 코드
class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }
}

/*************************************************************************************/
/*************************************************************************************/

// 👍 매개변수를 질의 함수로 바꿈 
class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    return 30000 + this.bonusAmount;
  }

  get bonusAmount() {
    return this.overThresholdAmount + this.perAudienceAmount;
  }

  get overThresholdAmount() {
   // 👉 if (this.performance.audience > 20) 대체 가능 이유는 20 보다 큰지 확인 하는 것이기 떄문 생각해보면 당연한것 !
    return Math.max(this.performance.audience - 20, 0) * 500;
  }

  get perAudienceAmount() {
    return 300 * this.performance.audience;
  }
}
```
- 사용 중인 데이터 구조에서 값들을 뽑아서 각가의 별개의 매개변수를 전달하는 코드라면 `객체 통째로 넘기기`를 적용해서 원본 데이터 구조를 그대로 전달한다.
- 항상 함께 전달되는 매개변수들의 그룹이 있다면 해댕 목록의 변수들을 `매개변수 객체 만들기`를 사용해주자
- 함수의 동장 방식을 정하는 플래그 역할의 매개변수는 `플래그 인수 제거하기`로 없애준다.
  - 코드를 이해하기 어려워지기 때문 이럴 경우 메서드를 `2개로 나눠서` 사용해주는것이 더욱 가독성이 높디.
```javascript
// 👎 원래 코드
function calculateTotal(amount, applyDiscount) {
  if (applyDiscount) {
    // 할인을 적용하는 로직
    return amount * 0.9;
  } else {
    return amount;
  }
}
        
/*************************************************************************************/
/*************************************************************************************/

// 👍 메서드를 분리함
function calculateTotalWithoutDiscount(amount) {
  return amount;
}

function calculateTotalWithDiscount(amount) {
  return amount * 0.9;
}
```
- 클래스를 활용 하는 것도 매개변수 목록을 줄이는데 효적인 수단이다.
  - 여러 개의 함수가 특정 매개변수들의 값을 공통적으로 사용할 경우 `여러 함수를 클래스로 묶어` 사용해 주자.
```javascript
// 👎 원래 코드
function calculateTotalWithDiscount(amount, applyDiscount) {
  let total = amount;
  if (applyDiscount) {
    total *= 0.9;
  }
  return total;
}

function calculateTax(amount, taxRate) {
  return amount * (taxRate / 100);
}

function calculateFinalPrice(amount, applyDiscount, taxRate) {
  const total = calculateTotalWithDiscount(amount, applyDiscount);
  const tax = calculateTax(total, taxRate);
  return total + tax;
}
        
/*************************************************************************************/
/*************************************************************************************/

// 👍 PricingCalculator 클래스로 묶어 생성자들 통해 주입 받아 사용함
class PricingCalculator {
  constructor(amount, applyDiscount, taxRate) {
    this.amount = amount;
    this.applyDiscount = applyDiscount;
    this.taxRate = taxRate;
  }

  calculateTotalWithDiscount() {
    let total = this.amount;
    if (this.applyDiscount) {
      total *= 0.9;
    }
    return total;
  }

  calculateTax() {
    return this.amount * (this.taxRate / 100);
  }

  calculateFinalPrice() {
    const total = this.calculateTotalWithDiscount();
    const tax = this.calculateTax();
    return total + tax;
  }
}
```

### 전역 데이터
- 전역 데이터는 악취 중에 `가장 독한` 축에 속한다.
  - 코드 내 어디서든 건들일 수 있고 값을 누가 바꿨는지 찾아 낼 방법이 없기 떄문이다.
  - 버그가 끊임 없이 발생할 확률이 높은데 그 원인을 찾아내기가 굉장히 어렵다.
- 대표적인 리퍅토링 방법은 `변수 캡슐화하기`이다.
```javascript
// 👎 원래 코드
let globalCounter = 0;

function incrementCounter() {
  globalCounter++;
}

function getCounter() {
  return globalCounter;
}
        
/*************************************************************************************/
/*************************************************************************************/

// 👍 전역 변수를 캡슐화 시킴
class Counter {
  constructor() {
    this.globalCounter = 0; // 앞에 _를 붙여서 내부 변수임을 나타냅니다.
  }

  increment() {
    this.globalCounter++;
  }

  getCount() {
    return this.globalCounter;
  }
}
```

### 가변 데이터
- 코드의 다른 곳에서는 다른 값을 기대한다는 사실을 인식 하지 못한 채 수정하여 프로그램 오작동 하며 이러한 문제가 아주 드문 조건에서 발생한다면 원인을 찾아내는 것이 매우 어렵다.
- 데이터를 변경하려면 반드시 원래 데이터는 그대로 둔채 변경하려는 값에 해당하는 `복사본을 만들어서 반환` 하는 것을 습관화 하자
- 무분별한 데이터 수정에 따른 위험을 줄이는 방법
  - `변수 캡슐화하기`를 적용허여 정해 놓은 함수를 거쳐야만 값을 수정할 수 있도록 하면 값이 어떻게 수정 되는지 감시하거나 코드를 개선하기 쉬움. (브레이크포인트를 활용)
  - 하나의 변수에 용도가 다른 값들을 저장하느라 값을 갱신하는 경우 `변수 쪼개기`를 이용하여 용도별로 독딜 변수에 저장하게 하여 값 갱신이 문제를 일으킬 여지를 없앤다.
     ```javascipt
     // 👎 원래 코드
     function calculateEmployeeSalary(employee) {
       let baseSalary = employee.baseSalary;
       if (employee.isManager) {
          baseSalary += 1000;
       }
       if (employee.hasOvertime) {
         baseSalary += 500;
       }
         return baseSalary;
     }
    
     /*************************************************************************************/
     /*************************************************************************************/
 
     // 👍 전역 변수를 캡슐화 시킴
     function calculateEmployeeSalary(employee) {
        let baseSalary = employee.baseSalary;
        let managerBonus = employee.isManager ? 1000 : 0;
        let overtimeBonus = employee.hasOvertime ? 500 : 0;
        return baseSalary + managerBonus + overtimeBonus;
     }   
     ``` 
  - 갱신 로직은 다른 코드와 떨어뜨려 놓는 것이 좋기에 `문장 슬라이드하기` 와 `함수 추출하기`를 이용해서 코드를 분리해주는 것이 좋다.
  - `파생 변수를 질의 함수로 바꾸기`로 변경해서 코드에 적용하기
  - `여러 함수를 클래스로 묶기`로 묶거나 `여러 함수를 변호나 함수로` 묶는 방법을 적용할 수 있다.
  - 내부 필드를 직접 수정하지말고 `참조 값으로 바꾸기`를 적용하여 구조체를 통쨰로 교체하는 편이 더 좋은 방법이다.

### 뒤엉킨 변경
- 소프트웨어의 구조는 변경하기 쉬연 형태로 구성되어야한다.
  - 소프트웨어는 소프트해야 마땅하기 때문이다.
  - 코드를 수정할 떄 `고쳐야할 딱 한군데를 찾아서 수정할 수 있는것`이 좋은 소프트웨어 이다.
- 이렇게 하지 못하는 이유 중 하나는 코드가 `단일 책임 원칙(Single Responsibility Principle)`을 제대로 지키지 않았기 때문이다.
  - 하나의 모듈이 서로 다른 이유로 인해 여러 가지 방식으로 변경되는 일이 많을 떄 발생한다.
- `단계 쪼개기` 와 전체 처리 과정에서 각기 다른 맥륵의 함수를 호출하는 빈도가 높다면 각 `맥락에 해당하는 적당한 모듈을 만들어` 주자.
- 여러 맥락의 일에 관여하는 함수가 있다면 옮기기 전에 `함수로 추출`하여 사용해 주자.

### 산탄총 수술
- 코드를 변경 할때 마다 자잘하게 수정해야 하는 클래스가 너무 많을 때 생기는 문제를 의미한다.
  - 변경할 부분이 코드 전반에 퍼져있다면 찾기도 어렵고 꼭 수정해야할 곳을 지나칠 활률도 높다.
- 함께 변경되는 대상들을 `함수옮기기` 와 `필드 옮기기`로 모두 한 `모듈`에에 묶어 두면 관리하기가 쉽다.
- 비슷한 데이터를 다루는 함수가 많다면 여러 함수를 `클래스로 묶어`준 후 함수들의 출력 결과를 묶어서 다음 단계의 로직에 전달 할 수있다면 `단계 쪼개기`를 적용해 주자

### 기능 편애
- 어떤 함수가 자기가 속한 모듈의 함수나 데이터보다 `다른 모듈`의 함수나 데이터와 `상호 작용할 일이 더 많을 때` 생기는 문제이다.
- 프로그램을 모듈화 할 때는 영역 `안`에서 이뤄지는 상호작용은 `최대한 늘리고`, 영역 `사이`에서 이뤄지는 상호작용은 `최소로 줄이는데` 주력 하자
- 자주 사용하는 모듈로 해당 기능을 옮겨 주는 방법으로 해결 할 수 있다.
  - 둘다 사용해서 어디로 옮겨야 할지 모를경우 가장 많은 데이터를 포함한 모듈로 옮겨주자
    - `함수 추출하기`로 함수를 여러 조각으로 나눈 후 각각을 접합한 모듈로 옮기면 더 쉽게 해결 할 수 있다.

### 데이터 뭉치
- 몰려다니는 데이터 뭉치는 `클래스` 단위로 묶어서 관리해주자.
  - 데이터 뭉치가 앞에서 새로 만든 객체의 필드 중 일부만 사용하더라도 괜찮다.
  - 새 객체로 뽑아낸 필드가 두 개 이상이기만 해도 확실히 예전보다는 나이진 것이기 때문이다.

### 기본형 집착
- 기본형식에 집착하여 주어진 문제에 맞는기초 타입(화폐,좌표,구간,날짜 등)을 직접 정의하지 않고 기본형을 사용하여 해결하려 하는 문제.
  - 금앨을 그냥 숫자형으로 계산하거나, 물리량을 계산할때 밀리미터나 인치 같은 단위를 뭇시하는 것
- 해당 형식을를 제공해주는 `라이브러리`를 활용하거나 `직접 기능을 하는 Class`를 만들어 적용해 주자.

### 반복되는 switch문
- 같은 조건으로 반복되는 switch문은 다형성을 통해 리팩토링이 가능하다.
```javascipt
// 👎 원래 코드
class Shape {
  constructor(type) {this.type = type;}

  area() {
    switch (this.type) {
      case 'circle':
        return Math.PI * this.radius * this.radius;
      case 'rectangle':
        return this.width * this.height;
      // 등등 .. 
    }// switch
  }// area
}

// 원 class
class Circle extends Shape {
  constructor(radius) {
    super('circle');
    this.radius = radius;
  }// constructor
}

// 직사각형 class
class Rectangle extends Shape {
  constructor(width, height) {
    super('rectangle');
    this.width = width;
    this.height = height;
  } // constructor
}
    
/*************************************************************************************/
/*************************************************************************************/
 
 // 👍 전역 변수를 캡슐화 시킴
class Shape {
  constructor() {}
  area() {}
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}
 ``` 

### 추측성 일반화
- "나중에 필요할 거야"라는 생각으로 당장은 필요 ㅇ벗느 모든 종류의 후킹 포인트와 특이 케이스 처리 로직을 작성해 둔 코드를 작성 해 놓는 문제.
- 쓸때 없이 파일의 라인이 길어지며 관리하기 어려워진다.
- 당장 걸리적 거리는 코드는 형상 관리에 남겨 둔 후 삭제해 버리자.

### 임시 필드
- 특정 상황에서만 값이 설정되는 필드를 가진 클래스가 있는데 객체를 가져올때는 당연히 모든 필드가 채워져 있으리라 기대하는 게 보통이기에 해당 파일을 보기 전까지 알수가   
  없다는 단점이 있다.
```javascipt
//  임시 필드 예시
class Order {
  constructor(id) {
    this.id = id;
    this.items = [];
    this.isProcessed = false; // 👉 임시 필드 코드를 열기까지  알 수가 없음 
  }

  addItem(item) {
    this.items.push(item);
  }

  process() {
    // 주문 처리 로직
    this.isProcessed = true;
  }
}
 ```
- 임시 필드는 클래스 추출하기로 위치를 변경해준 후 함수 옮기기로 임시 필드들과 관련도니 코드를 새 클래스로 몰아 넣자.
- `특이 케이스 추가하기`로 필드들이 유효하지 않을 때 위한 대안 클래스를 만들어 주는 방법도 있다.

### 메시지 체인
- 클라이언트가 한 객체를 통해 다른 객체를 얻은 뒤 방금 얻은 객체에 또 다른 객체를 요청하는 작업이 연쇄적으로 이어지는 코드를 말한다.
- 사용 시 네비게이션 중간 단계를 수정하면 클라이언트의 코드도 수정해야하는 문제가 생길 때가 있다.
  - `managerName = aPerson.departmane.manager.name` -> 중간의 `manager`가 변경 되면 해당 코드를 사용하는 전체를 수정해야함.
    - 이러한 경우 `위임 숨기기` 와 `함수 옮기기`러 함수를 추출하여 객체를 사용하는 코드를 뺴내어서 사용하면 된다.
    ```javascript
    // 👎 변경 전
    managerName = aPerson.department.manager.name;
        
    /*************************************************************************************/
    /*************************************************************************************/
    // 👍 변경 후
    class reportAutoGenerator{
      constructor(aPerson){
        this.aPerson = aPerson;
      }// constructor
    
      report(){return this.aPerson.department.manager.name;}
    } 
    console.log(reportAutoGenerator.report(aPerson));
    ```
    
### 중개자
- 객체의 대표적인 기능중 하나로, 외부로부터 세부사항을 숨겨주는 `캡슐화`가 있다.
- 캡슐화하는 과정에서 `위임이 자주` 활용된다.
  - 클래스가 제공하는 메서드 중 절반이 다른 클래스에  구현을 위임하고 있는 형태의 지나친 위임은 문제가 된다. 이러한 경우 `중개자 제거하기`를 사용하여 리팩토링 해주자.

### 내부자 거래
- 모듈 사이의 데이터 거래가 많으면 결합도가 높아 지므로 그양을 최소로 줄이고 모두 투명하게 처리해야한다.
- 은밀하게 데이터를 주고받는 모듈들이 있다면 `함수 옮기기`와 `필드 옮기기` 기법을 떼어 놓아서 사적으로 처리하는 부분을 줄여 주자.
- 여러 모듈이 같은 관심사를 공유한다면 공통 부분을 정식으로 처리하는 `제 3 모듈을 새로 만드거`나 `위임 숨기기`를 이용하여 다른 모듈이 중산자 역할을 하게 만들자.

