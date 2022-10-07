const ATTACK_VALUE = 15;
const MONSTER_ATTACK_VALUE = 22;
const STRONG_ATTACK_VALUE = 30;
const HEAL_VALUE = 15;
const enterValue = prompt(`Enter max life`, `100`);

let chosenMaxLife = parseInt(enterValue);
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 201;
}
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
  if (currentPlayerHealth <= 5 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert(
      'The Extra Life Was Your Saving Grace...Now Your Extra Life Was Useful.'
    );
  }

  if (currentMonsterHealth <= 5 && currentPlayerHealth > 5) {
    alert('You won!!');
  } else if (currentPlayerHealth <= 5 && currentMonsterHealth > 5) {
    alert('Monster Won!!');
  } else if (currentMonsterHealth <= 5 && currentPlayerHealth <= 5) {
    alert('It is a draw...');
  }

  if (currentPlayerHealth <= 5 || currentMonsterHealth <= 5) {
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
