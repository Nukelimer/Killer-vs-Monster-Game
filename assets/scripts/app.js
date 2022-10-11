const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 20;
const HEAL_VALUE = 15;

function enteredInputValue() {
  let enteredValue = prompt(`Enter max life`, `100`);
  enteredValue = parseInt(enteredValue);
  if (isNaN(enteredValue) || enteredValue <= 0) {
    throw `The Input Is Not A Number...Reload!!!`;
  }
  return (enteredValue = 101);
}

let chosenMaxLife = enteredInputValue();
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = chosenMaxLife - 50;
    alert(
      'The Extra Life Was Your Saving Grace...Now Your Extra Life Was Useful.'
    );
    setPlayerHealth(chosenMaxLife - 50);
    // reset()
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You won!!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('Monster Won!!');
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert('It is a draw...');
  }

  if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  let maxDamage;
  if ((mode = 'ATTACK')) {
    maxDamage = ATTACK_VALUE;
  } else if ((mode = 'STRONG_ATTACK')) {
    maxDamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth = currentMonsterHealth - damage;
  endRound();
}

function attackHandler() {
  attackMonster('ATTACK');
}

function strongAttackHandler() {
  attackMonster('STRONG_ATTACK');
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert('You cannot heal beyond maximium');
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth += HEAL_VALUE;
  endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
