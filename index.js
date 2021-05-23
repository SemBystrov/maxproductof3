import './style.css';

const appDiv = document.getElementById('app');

appDiv.innerHTML = `
  <h1>Максимальное произведение трёх</h1>
  <input id="input" type="text" class="input" placeholder="Введите числа через запятую">  
  <p class="input__description">Пример: 1, -2, 3, 4</p>
  <div id="answer" class="answer"></div>
`;

// getMinNumbers и getMaxNumbers не оптимизированы

function getMinNumbers(numbers, count) {
  const copyNumbers = numbers.slice();
  copyNumbers.sort((l, r) => l - r);

  if (copyNumbers.length <= count) return copyNumbers;

  return copyNumbers.slice(0, count);
}

function getMaxNumbers(numbers, count) {
  const copyNumbers = numbers.slice();
  copyNumbers.sort((l, r) => r - l);

  if (copyNumbers.length <= count) return copyNumbers;

  return copyNumbers.slice(0, count);
}

function multiplication3(numbers) {
  return numbers.reduce((prod, item) => prod * item, 1);
}

function maxProductOf3(numbers) {
  if (numbers.length < 3)
    return 'Массив должен состоять минимум из трёх элементов';

  if (numbers.length === 3) return multiplication3(numbers);

  const applicants = numbers.reduce(
    (nums, item) => {
      if (item < 0) {
        nums.minNegativeNumbers.push(item);
        nums.maxNegativeNumbers.push(item);

        nums.minNegativeNumbers = getMinNumbers(nums.minNegativeNumbers, 2);
        nums.maxNegativeNumbers = getMaxNumbers(nums.maxNegativeNumbers, 3);
      } else {
        nums.maxPositiveNumbers.push(item);

        nums.maxPositiveNumbers = getMaxNumbers(nums.maxPositiveNumbers, 3);
      }
      return nums;
    },
    {
      minNegativeNumbers: [],
      maxNegativeNumbers: [],
      maxPositiveNumbers: []
    }
  );

  // Только отрицательные
  if (applicants.maxPositiveNumbers.length === 0)
    return multiplication3(applicants.maxNegativeNumbers);
  // Только положительные или с одним отрицательным
  else if (applicants.minNegativeNumbers.length < 2)
    return multiplication3(applicants.maxPositiveNumbers);
  else {
    const product1 = multiplication3([
      applicants.maxPositiveNumbers[0],
      ...applicants.minNegativeNumbers
    ]);
    const product2 = multiplication3(applicants.maxPositiveNumbers);
    return Math.max(product1, product2);
  }
}

const answerDiv = document.getElementById('answer');
const input = document.getElementById('input');

input.addEventListener('input', event => {
  const numbers = input.value.split(', ').reduce((nums, item) => {
    if (!isNaN(Number.parseInt(item))) nums.push(Number.parseInt(item));

    return nums;
  }, []);
  const answer = maxProductOf3(numbers, 3);

  answerDiv.innerHTML = `
    <p class="answer__data"><strong>Ответ функции:</strong> ${answer}</p>
  `;
});
