export function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  for (let perf of invoice.performances) {
    // 포인트를 적립한다.
    volumeCredits += volumeCreditsFor(perf);
    // 청구 내역을 출력한다.
    result += `  ${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += amountFor(perf);
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;

  function playFor(performance) {
    return plays[performance.playID];
  }
  function volumeCreditsFor(performance) {
    let result = 0;
    result += Math.max(performance.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    'comedy' === playFor(performance).type
      ? (volumeCredits += Math.floor(performance.audience / 5))
      : null;
    return result;
  }
  function amountFor(performance) {
    let result = 0;
    switch (playFor(performance).type) {
      case 'tragedy': // 비극
        // result = typeTragedy(result, performance); // 플래그 사용하면 좋지 않아서 그냥 tragedy 일때랑 comedy일 때 따로 만듬.
        result = 40000;
        if (performance.audience > 30) {
          result += 1000 * (performance.audience - 30);
        }
        break;
      case 'comedy': // 희극
        result = 30000;
        performance.audience > 20
          ? (result += 10000 + 500 * (performance.audience - 20))
          : null;
        result += 300 * performance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${playFor(performance).type}`);
    }
    return result;
  }
}

// E Refactoring
function format(number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(number);
}

// My Refactoring
// 비극
function typeTragedy(thisAmount, perf) {
  thisAmount = 40000;
  return perf.audience > 30
    ? (thisAmount += 1000 * (perf.audience - 30))
    : null;
}

//희극
function typeComedy(thisAmount, perf) {
  thisAmount = 30000;
  perf.audience > 20
    ? (thisAmount += 10000 + 500 * (perf.audience - 20))
    : null;
  return (thisAmount += 300 * perf.audience);
}

// function isComedy(volumeCredits, perf) {
//   volumeCredits += Math.floor(perf.audience / 5);
// }
// 사용예:
const playsJSON = {
  hamlet: { name: 'Hamlet', type: 'tragedy' },
  'as-like': { name: 'As You Like It', type: 'comedy' },
  othello: { name: 'Othello', type: 'tragedy' },
};

const invoicesJSON = [
  {
    customer: 'BigCo',
    performances: [
      {
        playID: 'hamlet',
        audience: 55,
      },
      {
        playID: 'as-like',
        audience: 35,
      },
      {
        playID: 'othello',
        audience: 40,
      },
    ],
  },
];

const result = statement(invoicesJSON[0], playsJSON);
const expected =
  '청구 내역 (고객명: BigCo)\n' +
  '  Hamlet: $650.00 (55석)\n' +
  '  As You Like It: $580.00 (35석)\n' +
  '  Othello: $500.00 (40석)\n' +
  '총액: $1,730.00\n' +
  '적립 포인트: 47점\n';
console.log(result);
console.log(result === expected);
