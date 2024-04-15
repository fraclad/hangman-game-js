// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')
console.log("H A N G M A N");

function hide_char(text) {
  let text_arr = text.split("");
  for (let i = 0; i < text_arr.length; i++) {
    if (i >= 3) {
      text_arr[i] = "-";
    }
  }
  let text_hidden = text_arr.join("");
  return text_hidden
}

function hide_all_chars(text){
  let result = text.replace(/./g, '-');
  return result
}

function check_char_entry(char_guess, answer){
  return answer.includes(char_guess) 
}

function replace_hidden_text(char_reveal, hidden_answer, answer){
  let hidden_answer_arr = hidden_answer.split('');
  for (let i=0; i<answer.length; i++){
    if (char_reveal == answer[i]){
      hidden_answer_arr[i] = char_reveal
    }
  }
  let re_render_answer = hidden_answer_arr.join('');
  return re_render_answer
}

function guess_char_checker(gc){
  if (gc.length != 1){
    console.log("Please, input a single letter.\n");
    return false
  };
  if (gc !== gc.toLowerCase() || /^[0-9]$/.test(gc) || !/^[A-Za-z]$/.test(gc)){
    console.log("Please, enter a lowercase letter from the English alphabet.\n");
    return false
  };
  return true
}

function prompt_menu(){
  return input(`Type "play" to play the game, "results" to show the scoreboard, and "exit" to quit: `)
}

function main_game(){
  let answers = ["python", "java", "swift", "javascript"];
  // let answers = ["java"];
  let session_answer_idx = Math.floor(Math.random() * answers.length);
  let session_answer = answers[session_answer_idx];
  let session_answer_render = hide_all_chars(session_answer);
  let submitted_guesses = [];
  
  console.log("");
  let remaining_attempt = 8;
  
  while (remaining_attempt > 0){
    console.log(session_answer_render);
    let char_guess = input("Input a letter: ");
    let is_char_valid = guess_char_checker(char_guess);
    if (is_char_valid) {
      if (check_char_entry(char_guess, session_answer)){
        session_answer_render = replace_hidden_text(char_guess, session_answer_render, session_answer);
      };
      
      if (submitted_guesses.includes(char_guess)){
        console.log("You've already guessed this letter.")
      };
  
      if (!check_char_entry(char_guess, session_answer) && !submitted_guesses.includes(char_guess)) {
        console.log("That letter doesn't appear in the word.")
        remaining_attempt -= 1;
      };
      submitted_guesses.push(char_guess);
  
      if (!session_answer_render.includes('-')){
        console.log(`You guessed the word ${session_answer_render}!`);
        console.log("You survived!");
        num_win += 1
        break;
      };
    
      if (remaining_attempt == 0){
        console.log("You lost!");
        num_loss += 1
        break;
      }
      console.log("")
    }
    submitted_guesses.push(char_guess);
  
  };  
}

let num_win = 0;
let num_loss = 0;
let menu_input = prompt_menu()
while (menu_input !== "exit"){
  if (menu_input === "results"){
    console.log(`You won: ${num_win} times.`)
    console.log(`You lost: ${num_loss} times.`)
    menu_input = prompt_menu();
  } else if (menu_input === "play"){
    main_game();
    menu_input = prompt_menu();
  }
}



