import { useState } from 'react';
import './App.css';
import Ship from './Ship.jsx';

function App({minDmg = 2, maxDmg = 20}) {
  // needed components:
  // player (has health and stuff)
  // attack button
  // status box at bottom

  // notes: passing a stateful variable down to a child component will actually keep updating and the child component will update to reflect that
  const baseHealth = 100;
  
  const [playerHealth, setPlayerHealth] = useState(baseHealth);
  const [enemyHealth, setEnemyHealth] = useState(baseHealth);

  const [attackButtonOn, toggleAttackButton] = useState(true);

  const messages = ["Engage the enemy!", "Mission failure; your ship has been destroyed.", "Mission success! You have defeated the enemy."];
  const [message, setMessage] = useState(0);

  // arrow function; handle presses from the attack button
  const onAttack = () => {
    if (attackButtonOn) {
      let playerHurt = Math.floor(Math.random() * (maxDmg - minDmg) + minDmg);
      let enemyHurt = Math.floor(Math.random() * (maxDmg - minDmg) + minDmg);

      // because updating state happens asynchronously, we need a local copy of the new health values to tell if someone died
      // also, minimum is 0 health
      let newPlayerHealth = Math.max(0, playerHealth - playerHurt);
      let newEnemyHealth = Math.max(0, enemyHealth - enemyHurt);

      setPlayerHealth(newPlayerHealth);
      setEnemyHealth(newEnemyHealth);

      // check if game has ended
      if (newPlayerHealth <= 0 || newEnemyHealth <= 0) {
        if (newPlayerHealth <= 0) { // if you both die at the same time, the player still loses which is intended
          setMessage(1); // show failure message

        } else if (newEnemyHealth <= 0) {
          setMessage(2); // success message

        }
        // hide fire button and change start to restart
        toggleAttackButton(false);
      }
    } else {
      // game is over, restart now

      // restore health
      setPlayerHealth(baseHealth);
      setEnemyHealth(baseHealth);

      // reset message
      setMessage(0);

      toggleAttackButton(true);
    }
  }

  return (
    <>
      <h1>Space Battle Simulator</h1>
      <div id='ships'>
        <Ship name="Player" health={playerHealth} />
        <Ship name="Enemy" health={enemyHealth} />
      </div>
      
      <button onClick={onAttack}>{attackButtonOn ? "Attack!" : "Restart?"}</button>
      <p id='captains-log'>{messages[message]}</p>
    </>
  )
}

export default App;
